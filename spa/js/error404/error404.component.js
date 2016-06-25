'use strict';
import template from "./error404.html";

function controller (AuthService) {
    "ngInject";

    let user = AuthService.getAuthUser();

    this.userName = user.userName;
    this.photoUrl = user.photo;
}

export default {
    template
}