'use strict';

export default function() {
    this.rightParams = {
        login: '123@i',
        password: '456'
    };

    this.isAuthorized = false;

    this.signIn = (login, password) => {
        this.isAuthorized = (login === this.rightParams.login && password === this.rightParams.password);
    };

    this.checkAuth = () => {
        return this.isAuthorized;
    }
}