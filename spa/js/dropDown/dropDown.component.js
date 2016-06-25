/**
 * Created by andrej on 6/25/16.
 */
import template from './dropDown.html';

export default {
    template: template,
    controller: function () {
        "ngInject";

        this.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        };

        this.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
    },
    bindings: {
        items: '<'
    }

}
