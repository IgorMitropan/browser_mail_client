'use strict';
import template from "./contactList.html";

function controller ($filter, $scope) {
    "ngInject";
    
    this.contacts = $filter('orderBy')(this.contacts, 'fullName');

    this.numberOfSelectedItems = 0;

    $scope.$watch('$ctrl.selectAll', (selectAll) => {
        $scope.$ctrl.contacts.forEach(item => item.selected = selectAll);

        $scope.$ctrl.change();
    });

    this.change = () => {
        let newNumberOfSelectedItems = this.contacts.filter(item => {return item.selected}).length;

        if (newNumberOfSelectedItems && !this.numberOfSelectedItems) {
            this.isAnyItemSelected = true;
        }

        if (!newNumberOfSelectedItems && this.numberOfSelectedItems) {
            this.selectAll = false;
            this.isAnyItemSelected = false;
        }

        if (newNumberOfSelectedItems === this.contacts.length) {
            this.selectAll = true;
        }

        this.numberOfSelectedItems = newNumberOfSelectedItems;
    }
}

export default {
    template,
    bindings: {
        contacts: '<',
        selectAll: '=',
        isAnyItemSelected: '='
    },
    controller
}

