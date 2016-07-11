function uiViewConfig($provide) {
    'ngInject';

    var ngMajorVer = angular.version.major;
    var ngMinorVer = angular.version.minor;

    $provide.decorator('uiViewDirective', function($delegate, $state, $injector, $interpolate, $uiViewScroll) {
        'ngInject';
        function getService() {
            return ($injector.has) ? function(service) {
                return $injector.has(service) ? $injector.get(service) : null;
            } : function(service) {
                try {
                    return $injector.get(service);
                } catch (e) {
                    return null;
                }
            };
        }
        console.log('test');

        var service = getService(),
            $animator = service('$animator'),
            $animate = service('$animate');

        // Returns a set of DOM manipulation functions based on which Angular version
        // it should use
        function getRenderer(attrs, scope) {
            var statics = {
                enter: function (element, target, cb) { target.after(element); cb(); },
                leave: function (element, cb) { element.remove(); cb(); }
            };

            if (!!attrs.noanimation) return statics;

            function animEnabled(element) {
                if (ngMajorVer === 1 && ngMinorVer >= 4) return !!$animate.enabled(element);
                if (ngMajorVer === 1 && ngMinorVer >= 2) return !!$animate.enabled();
                return (!!$animator);
            }

            // ng 1.2+
            if ($animate) {
                return {
                    enter: function(element, target, cb) {
                        if (!animEnabled(element)) {
                            statics.enter(element, target, cb);
                        } else if (angular.version.minor > 2) {
                            $animate.enter(element, null, target).then(cb);
                        } else {
                            $animate.enter(element, null, target, cb);
                        }
                    },
                    leave: function(element, cb) {
                        if (!animEnabled(element)) {
                            statics.leave(element, cb);
                        } else if (angular.version.minor > 2) {
                            $animate.leave(element).then(cb);
                        } else {
                            $animate.leave(element, cb);
                        }
                    }
                };
            }

            // ng 1.1.5
            if ($animator) {
                var animate = $animator && $animator(scope, attrs);

                return {
                    enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
                    leave: function(element, cb) { animate.leave(element); cb(); }
                };
            }

            return statics;
        }

        function getUiViewName(scope, attrs, element, $interpolate) {
            var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
            var inherited = element.inheritedData('$uiView');
            return name.indexOf('@') >= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));
        }

        var directive = $delegate[0];

        /*
            ui-router has two directives with uiView name. But we should redefine one only,
            that responsible for view rendering logic
        */
        if(directive.priority < 0) {
            return $delegate;
        }

        directive.compile = function (tElement, tAttrs, $transclude) {
            return function (scope, $element, attrs) {
                var previousEl, currentEl, currentScope, latestLocals,
                    onloadExp     = attrs.onload || '',
                    autoScrollExp = attrs.autoscroll,
                    renderer      = getRenderer(attrs, scope);

                scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    updateView(false, event, toState, toParams, fromState, fromParams);
                });

                updateView(true);

                function cleanupLastView() {
                    var _previousEl = previousEl;
                    var _currentScope = currentScope;

                    if (_currentScope) {
                        _currentScope._willBeDestroyed = true;
                    }

                    function cleanOld() {
                        if (_previousEl) {
                            _previousEl.remove();
                        }

                        if (_currentScope) {
                            _currentScope.$destroy();
                        }
                    }

                    if (currentEl) {
                        renderer.leave(currentEl, function() {
                            cleanOld();
                            previousEl = null;
                        });

                        previousEl = currentEl;
                    } else {
                        cleanOld();
                        previousEl = null;
                    }

                    currentEl = null;
                    currentScope = null;
                }

                function updateView(firstTime, event, toState, toParams, fromState, fromParams) {
                    var newScope,
                        name            = getUiViewName(scope, attrs, $element, $interpolate),
                        previousLocals  = name && $state.$current && $state.$current.locals[name];

                    if(!firstTime &&
                        (toState.name === fromState.name) &&
                        (previousLocals === latestLocals ||
                        scope._willBeDestroyed)) {
                        return; //reloadOnParams state option
                    } else { //original ui-router view render processing
                        if (!firstTime && (previousLocals === latestLocals || scope._willBeDestroyed)) {
                            return; // nothing to do
                        }
                    }

                    newScope = scope.$new();
                    latestLocals = $state.$current.locals[name];

                    newScope.$emit('$viewContentLoading', name);

                    var clone = $transclude(newScope, function(clone) {
                        renderer.enter(clone, $element, function onUiViewEnter() {
                            if(currentScope) {
                                currentScope.$emit('$viewContentAnimationEnded');
                            }

                            if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                                $uiViewScroll(clone);
                            }
                        });
                        cleanupLastView();
                    });

                    currentEl = clone;
                    currentScope = newScope;

                    currentScope.$emit('$viewContentLoaded', name);
                    currentScope.$eval(onloadExp);
                }
            };
        };

        return $delegate;
    });
}

export {uiViewConfig};