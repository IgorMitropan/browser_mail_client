'use strict';
const userProfile = {
    userName: 'John',
    photo: 'img/profile.jpg',
    login: '',
    password: ''
};

export default class AuthService {
    constructor() {
        this._isAuthorized = false;
    }

    get checkAuth() {
        return this._isAuthorized;
    }

    signIn (login, password) {
        this._isAuthorized = (login === userProfile.login && password === userProfile.password);
    }

    getAuthUser () {
        return {
            userName: userProfile.userName,
            photo: userProfile.photo
        }
    }
}

