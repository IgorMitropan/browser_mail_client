import template from './mailBoxes.html';

function controller($scope) {
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
