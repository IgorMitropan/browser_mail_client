'use strict';
import template from "./contactList.html";

function controller ($filter, $scope) {
    "ngInject";
    
    this.contacts = $filter('orderBy')(this.contacts, 'fullName');

    this.numberOfSelectedItems = 0;

    $scope.$watch('$ctrl.select', (select) => {
        $scope.$ctrl.contacts.forEach(item => item.selected = select);

        $scope.$ctrl.change();
    });

    this.change = () => {
        let newNumberOfSelectedItems = this.contacts.filter(item => {return item.selected}).length;

        if (newNumberOfSelectedItems && !this.numberOfSelectedItems) {
            $scope.$emit('selected');
        }

        if (!newNumberOfSelectedItems && this.numberOfSelectedItems) {
            $scope.$emit('deselected');
        }

        if (newNumberOfSelectedItems === this.contacts.length) {
            $scope.$emit('selectedAll');
        }

        this.numberOfSelectedItems = newNumberOfSelectedItems;
    }
}

export default {
    template,
    bindings: {
        select: '<',
        contacts: '<'
    },
    controller
}

