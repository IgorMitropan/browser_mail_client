'use strict';
import template from "./commonPage.html";

function controller (AuthService) {
    "ngInject";
    
    let user = AuthService.getAuthUser();

    this.userName = user.userName;
    this.photoUrl = user.photo;
}

export default {
    template,
    controller
}
