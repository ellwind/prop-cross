class Menu {
    constructor($rootScope, $scope, $state) {
        'ngInject';
        this.menu = [
            {
                name: 'Main',
                state:'main'
            }
        ];
        this.$scope.$ctrl = this;
        console.log(123);
    };

    $onInit() {

    };
}

let template = require('./Menu.html');

export {
    Menu,
    template,
    Menu as controller
};