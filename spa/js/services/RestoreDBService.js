'use strict';

import {DB} from '../defaultConsts.js';

export default class AuthService {
    constructor(Restangular) {
        "ngInject";
        this._DB = DB;
    }

    get DB () {
        return this._DB;
    }
    
    get users() {
        return this._DB.users;
    }

    get letters() {
        return this._DB.letters;
    }
    
    restoreDB() {
    }
    
    
    
}