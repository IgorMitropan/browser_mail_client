'use strict';
import template from './lettersList.html';

function controller($filter, $scope, $state, $q, Restangular) {
    "ngInject";

    let letters = this.letters;
    let lettersforSearch = this.letters;

    let mailboxFilter =  (mailboxId) => {
        $scope.$ctrl.letters = $filter('filter')(letters, mailboxId, true, 'mailbox');
        lettersforSearch = $scope.$ctrl.letters;
        this.selectAll = false;
    };
    let searchFilter = (search) => {
        $scope.$ctrl.letters = $filter('filter')(lettersforSearch, search);
    };

    let findIndexById = (arr, id) => {
        for (let i = 0; i<arr.length; i++) {
            if (arr[i]._id === id) {
                return i;
            }
        }
        return null;
    };
    

    this.numberOfSelectedItems = 0;

    $scope.$watch('$ctrl.mailboxId', mailboxFilter);
    
    $scope.$watch('$ctrl.selectAll', (selectAll) => {
        $scope.$ctrl.letters.forEach(item => item.selected = selectAll);

        $scope.$ctrl.change();
    });

    $scope.$watch('$ctrl.search', searchFilter);

    $scope.$on('deleteSelectedItems',  () => {
        let promisesArray = [];

        let selectedItems = $scope.$ctrl.letters.filter(item => item.selected);

        if (this.mailboxId === this.trashBoxId) {
            selectedItems.forEach(letter => {
                let index = findIndexById(letters, letter._id);
                letters.splice(index, 1);

                promisesArray.push(Restangular.one('letters', letter._id).remove());
            });
        } else {
            selectedItems.forEach(letter => {
                let index = findIndexById(letters, letter._id);
                letters[index].mailbox = this.trashBoxId;
                letters[index].selected = false;

                promisesArray.push(Restangular.one('letters', letter._id).patch(letters[index]));
            });
        }

        $q.all(promisesArray).then(() => {
            mailboxFilter(this.mailboxId);
            this.change();
        });
    });
    
    this.change = () => {
        let newNumberOfSelectedItems = this.letters.filter(item => {return item.selected}).length;
        console.log(newNumberOfSelectedItems);

        if (newNumberOfSelectedItems && !this.numberOfSelectedItems) {
            this.isAnyItemSelected = true;
        }

        if (!newNumberOfSelectedItems && this.numberOfSelectedItems) {
            this.selectAll = false;
            this.isAnyItemSelected = false;
            console.log('selectall', this.selectAll);
        }

        if (newNumberOfSelectedItems === this.letters.length) {
            this.selectAll = true;
        }

        this.numberOfSelectedItems = newNumberOfSelectedItems;
    };

}

export default {
    template,
    bindings: {
        letters: '<',
        mailboxId: '<',
        trashBoxId: '<',
        selectAll: '=',
        isAnyItemSelected: '=',
        search: '<'
    },
    controller
}
