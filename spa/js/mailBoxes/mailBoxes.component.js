import template from './mailBoxes.html';
import modalTemplate from './modalCompose.html';

import {TRASH_MAILBOX_INDEX} from '../defaultConsts';


function controller($scope, $uibModal, Restangular) {
    "ngInject";
    
    this.to = '';
    this.subject = '';
    this.body = '';
    

    this.mailboxId = this.mailboxes[this.selectedMailbox]._id;

    this.choseMailbox = (mailbox) => {
        this.mailboxId = mailbox._id;
        
        for (let i = 0; i< this.mailboxes.length; i++) {
            if (this.mailboxes[i]._id === this.mailboxId) {
                this.selectedMailbox = i;
            }
        }
    };
    
    this.trashBoxId = this.mailboxes[3]._id;

    this.modalController = function ($scope, $uibModalInstance) {

        $scope.sendTo = '';
        $scope.subject = '';
        $scope.body = '';


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        $scope.sendLetter = () => {
            let  letter = {"mailbox": "577106c16baa8d7d1bfe5dc7",
                "subject": $scope.subject,
                "body": $scope.body,
                "to": $scope.sendTo
            };
            
            Restangular.all('letters').post(letter).then(() => {
                $scope.sendTo = '';
                $scope.subject = '';
                $scope.body = '';
                $uibModalInstance.close();
            });
            console.log($scope);
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
