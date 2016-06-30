'use strict';

import {USER_PROFILE} from '../defaultConsts.js';

export default class AuthService {
    constructor() {
        this._isAuthorized = false;
        
        this._authUser = {
            userName: '',
            photo: ''
        };
        this._USER_PROFILE = USER_PROFILE;
    }

    get checkAuth() {
        return this._isAuthorized;
    }
    
    get authUser() {
        return this._authUser;
    }

    signIn (login, password) {
        this._isAuthorized = (login === this._USER_PROFILE.login && password === this._USER_PROFILE.password);
        
        this._authUser = {
            userName: this._USER_PROFILE.userName,
            photo: this._USER_PROFILE.photo
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

