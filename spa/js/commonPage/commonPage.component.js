'use strict';
import template from "./commonPage.html";

function controller (AuthService, $state, $scope) {
    "ngInject";
    
    let user = AuthService.authUser;

    this.userName = user.userName;
    this.photoUrl = user.photo;
    
    this.signOut = () => {
        AuthService.signOut();
        $state.go('login');
    };
    this.showDeleteBtn = false;

    $scope.$on('selected', (event) => {
        $scope.$ctrl.showDeleteBtn = true;
    });

    $scope.$on('deselected', () => {
        $scope.$ctrl.showDeleteBtn = false;
        $scope.$ctrl.select = false;
    });

    $scope.$on('selectedAll', (event) => {
        $scope.$ctrl.select = true;
    });



}

export default {
    template,
    controller
}
