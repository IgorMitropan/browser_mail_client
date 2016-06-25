import template from './dropDown.html';

function controller ($state) {
    "ngInject";

    this.choice = this.items[0];

    this.toggleDropdown = ($event) => {
        $event.preventDefault();
        $event.stopPropagation();
    };

    this.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

    this.goToChoice = (choice) => {
        this.choice = choice;

        if (choice.state) {
            $state.go(choice.state);
        }

    }
}

export default {
    template,
    bindings: {
        items: '<'
    },
    controller
}
