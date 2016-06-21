'use strict';
import template from "./login.html";

export default {
    template: template,
    controller: function($state, AuthService) {
        "ngInject";

        this.login = '';
        this.password = '';

        this.go = () => {
            AuthService.signIn(this.login, this.password);

            $state.go('secret');
        }
    }
}