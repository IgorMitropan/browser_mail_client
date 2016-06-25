'use strict';

export default function() {
    this.rightParams = {
        login: '',
        password: ''
    };

    this.isAuthorized = false;

    this.signIn = (login, password) => {
        this.isAuthorized = (login === this.rightParams.login && password === this.rightParams.password);
    };

    this.checkAuth = () => {
        return this.isAuthorized;
    }
}