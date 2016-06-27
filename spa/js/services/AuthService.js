'use strict';
const userProfile = {
    userName: 'John Smith',
    photo: 'img/profile.jpg',
    login: '',
    password: ''
};

export default class AuthService {
    constructor() {
        this._isAuthorized = false;
        
        this._authUser = {
            userName: '',
            photo: ''
        }
    }

    get checkAuth() {
        return this._isAuthorized;
    }
    
    get authUser() {
        return this._authUser;
    }

    signIn (login, password) {
        this._isAuthorized = (login === userProfile.login && password === userProfile.password);
        
        this._authUser = {
            userName: userProfile.userName,
            photo: userProfile.photo
        }
    }

    signOut () {
        this._isAuthorized = false;
        
        this._authUser = {
            userName: '',
            photo: ''
        }
    }
}

