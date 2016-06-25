import template from './dropDown.html';

function controller () {
    "ngInject";

    this.choice = 'Mail';

    this.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };

    this.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

    this.goToChoice = function (choice) {
        this.choice = choice;
    }
}

export default {
    template,
    bindings: {
        items: '<'
    },
    controller
}
