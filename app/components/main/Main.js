class Main {
    constructor($scope) {
        'ngInject';
    }

    $onInit () {
        console.log(1231231);
    }
}

let template = require('./Main.html');

export {
    Main,
    template,
    Main as controller
};