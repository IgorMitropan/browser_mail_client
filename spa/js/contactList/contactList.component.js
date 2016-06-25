'use strict';
import template from "./contactList.html";

function controller (Restangular, $filter) {
    "ngInject";

    this.contacts = [];
    Restangular.all('users').getList()
        .then(contacts => {
            this.contacts = $filter('orderBy')(contacts, 'fullName');
        })
}

export default {
    template,
    controller
}

