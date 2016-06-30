import template from './mailBoxes.html';
import modalTemplate from './modalCompose.html';


function controller($scope, $uibModal) {
    "ngInject";

    this.mailboxId = this.mailboxes[this.selectedMailbox]._id;

    this.choseMailbox = (mailbox) => {
        this.mailboxId = mailbox._id;
        
        for (let i = 0; i< this.mailboxes.length; i++) {
            if (this.mailboxes[i]._id === this.mailboxId) {
                this.selectedMailbox = i;
            }
        }
    };

    this.modalController = function ($scope, $uibModalInstance) {

        // $scope.ok = function () {
        //     $uibModalInstance.close(----data from form-----);
        // };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };

    this.openModal = () => {
        $uibModal.open({
            template: modalTemplate,
            controller: this.modalController
        });
    };
}

export default {
    template,
    bindings: {
        mailboxes: '<',
        selectedMailbox: '=',
        selectAll: '=',
        isAnyItemSelected: '=',
        search: '<'
    },
    controller
}
