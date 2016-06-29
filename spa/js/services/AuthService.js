'use strict';

import {USER_PROFILE} from '../defaultConsts.js';

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
        this._isAuthorized = (login === USER_PROFILE.login && password === USER_PROFILE.password);
        
        this._authUser = {
            userName: USER_PROFILE.userName,
            photo: USER_PROFILE.photo
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

