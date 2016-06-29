import template from './mailBoxes.html';

function controller($scope) {
    "ngInject";

    this.mailboxId = this.mailboxes[0]._id;

    this.choseMailbox = (mailbox) => {
        this.mailboxId = mailbox._id;
    };
}

export default {
    template,
    bindings: {
        mailboxes: '<',
        selectAll: '=',
        isAnyItemSelected: '=',
        search: '<'
    },
    controller
}
