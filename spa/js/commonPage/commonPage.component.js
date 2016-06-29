'use strict';
import template from "./commonPage.html";
import {COMMON_STATE_CHILDREN, SELECTED_COMMON_STATE_CHILD_INDEX, SELECTED_MAILBOX_INDEX} from '../defaultConsts.js';

let selectedStateChild = COMMON_STATE_CHILDREN[SELECTED_COMMON_STATE_CHILD_INDEX];
let selectedMailbox = SELECTED_MAILBOX_INDEX;

function controller (AuthService, $state, $scope) {
    "ngInject";

    this.stateChildren = COMMON_STATE_CHILDREN;
    this.selectedStateChild = selectedStateChild;
    this.selectedMailbox = selectedMailbox;

    let user = AuthService.authUser;
    this.userName = user.userName;
    this.photoUrl = user.photo;

    $scope.$on('stateWasChanged', function (event, state) {
        if (state.name === 'contact') {
            $scope.$ctrl.isListShown = false;
            $scope.$ctrl.isAnyItemSelected = true;
        } else {
            $scope.$ctrl.isListShown = true;
            $scope.$ctrl.isAnyItemSelected = false;
        }

        $scope.$ctrl.search = '';
        $scope.$ctrl.selectAll = false;
    });
    
    this.signOut = () => {
        selectedMailbox = SELECTED_MAILBOX_INDEX;
        AuthService.signOut();
        $state.go('login');
    };
    this.refresh = () => {
        selectedStateChild = this.selectedStateChild;
        selectedMailbox = this.selectedMailbox;
        $state.reload();
    };
}

export default {
    template,
    controller
}
