'use strict';
import template from "./commonPage.html";

function controller (AuthService, $state) {
    "ngInject";
    
    let user = AuthService.authUser;

    this.userName = user.userName;
    this.photoUrl = user.photo;
    
    this.signOut = () => {
        AuthService.signOut();
        $state.go('login');
    };
    this.click = () => {
        console.log(this.selectAll);
    };
}

export default {
    template,
    controller
}
