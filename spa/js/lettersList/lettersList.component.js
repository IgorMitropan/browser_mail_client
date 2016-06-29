'use strict';
import template from './lettersList.html';

function controller($filter, $scope) {
    "ngInject";

    let letters = this.letters;
    let lettersforSearch = this.letters;

    $scope.$watch('$ctrl.mailboxId', (mailboxId) => {
        $scope.$ctrl.letters = $filter('filter')(letters, mailboxId, true, '_id');
        lettersforSearch = $scope.$ctrl.letters;
    });

    this.numberOfSelectedItems = 0;

    $scope.$watch('$ctrl.selectAll', (selectAll) => {
        $scope.$ctrl.letters.forEach(item => item.selected = selectAll);

        $scope.$ctrl.change();
    });

    $scope.$watch('$ctrl.search', (search) => {
        $scope.$ctrl.letters = $filter('filter')(lettersforSearch, search);
    });

    this.change = () => {
        let newNumberOfSelectedItems = this.letters.filter(item => {return item.selected}).length;

        if (newNumberOfSelectedItems && !this.numberOfSelectedItems) {
            this.isAnyItemSelected = true;
        }

        if (!newNumberOfSelectedItems && this.numberOfSelectedItems) {
            this.selectAll = false;
            this.isAnyItemSelected = false;
        }

        if (newNumberOfSelectedItems === this.letters.length) {
            this.selectAll = true;
        }

        this.numberOfSelectedItems = newNumberOfSelectedItems;
    }

}

export default {
    template,
    bindings: {
        letters: '<',
        mailboxId: '<',
        selectAll: '=',
        isAnyItemSelected: '=',
        search: '<'
    },
    controller
}
