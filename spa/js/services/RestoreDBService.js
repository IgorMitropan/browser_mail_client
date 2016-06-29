'use strict';

import {DB} from '../defaultConsts.js';

export default class RestoreDBService {
    /* @ngInject*/

    constructor(Restangular) {
        "ngInject";

        this._DB = DB;
        this._Restangular = Restangular;
    }

    get DB () {
        return this._DB;
    }
    
    restoreDB() {
        let DB = this.DB;

        this._Restangular.all('users').then(users => {
            users.remove();
            users.post(DB.users);
        });

        this._Restangular.all('letters').then(users => {
            users.remove();
            users.post(DB.letters);
        })
    }
}