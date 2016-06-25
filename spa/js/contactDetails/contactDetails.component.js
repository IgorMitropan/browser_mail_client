'use strict';
import template from "./contactDetails.html";

function controller ($filter) {
    "ngInject";

    this.contact.birthdate = $filter('date')(this.contact.birthdate, 'dd.MM.yyyy');
    this.contact.gender = (this.contact.gender === 'M') ? 'male' : 'female';
}

export default {
    template,
    bindings: {
        contact: '<'
    },
    controller
}
