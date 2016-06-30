'use strict';
import template from "./contactList.html";

function controller ($filter, $scope, $q, Restangular) {
    "ngInject";
    
    this.contacts = $filter('orderBy')(this.contacts, 'fullName');
    let contacts = this.contacts;

    let findIndexById = (arr, id) => {
        for (let i = 0; i<arr.length; i++) {
            if (arr[i]._id === id) {
                return i;
            }
        }
        return null;
    };

    let search = (search) => {
        $scope.$ctrl.contacts = $filter('filter')(contacts, search, false, 'fullName');
    };

    this.numberOfSelectedItems = 0;

    $scope.$watch('$ctrl.selectAll', (selectAll) => {
        $scope.$ctrl.contacts.forEach(item => item.selected = selectAll);

        $scope.$ctrl.change();
    });

    $scope.$watch('$ctrl.search', search);

    $scope.$on('deleteSelectedItems',  () => {
        let promisesArray = [];

        let selectedItems = $scope.$ctrl.contacts.filter(item => item.selected);

        selectedItems.forEach(contact => {
                let index = findIndexById(contacts, contact._id);
                contacts.splice(index, 1);

                promisesArray.push(Restangular.one('users', contact._id).remove());
            });
        
        $q.all(promisesArray).then(() => {
            search();
            this.change();
        });

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
        
        if (newNumberOfSelectedItems && newNumberOfSelectedItems === this.contacts.length) {
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
        isAnyItemSelected: '=',
        search: '<'
    },
    controller
}

