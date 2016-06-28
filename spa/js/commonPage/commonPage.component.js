'use strict';
import template from "./commonPage.html";

const commonStateChildren = [
    {title:'Mail', state:'mail'},
    {title:'Contacts', state:'contacts'}
];

function controller (AuthService, $state) {
    "ngInject";

    this.commonStateChildren = commonStateChildren;

    let user = AuthService.authUser;
    this.userName = user.userName;
    this.photoUrl = user.photo;

    this.signOut = () => {
        AuthService.signOut();
        $state.go('login');
    };

}

export default {
    template,
    controller
}
