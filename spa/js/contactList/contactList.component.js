'use strict';
import template from "./contactList.html";

function controller ($filter) {
    "ngInject";
    
    this.contacts = $filter('orderBy')(this.contacts, 'fullName');
}

export default {
    template,
    bindings: {
        contacts: '<'
    },
    controller
}

