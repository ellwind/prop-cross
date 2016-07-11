class Application {
    constructor($scope) {
        'ngInject';
    }

    $onInit () {
        console.log('application')
    }
}

let template = require('./Application.html');

export {
    Application,
    template,
    Application as controller
};