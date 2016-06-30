'use strict';

import {DB} from '../defaultConsts.js';

export default class RestoreDBService {
    /* @ngInject*/

    constructor(Restangular) {
        "ngInject";

        this._DB = DB;
        this._Restangular = Restangular;

        this.restoreDB = this.restoreDB.bind(this);
    }

    get DB () {
        return this._DB;
    }
    
    restoreDB() {

        this._Restangular.all('users').getList().then(users => {
            let promise = users.remove();
            
            this.DB.users.forEach(user => {
                promise.then(() => users.post(user));
            });
        });

         this._Restangular.all('letters').getList().then(letters => {
             let promise = letters.remove();
             this.DB.letters.forEach(letter => {
                 promise.then(() => letters.post(letter));
             });
             
         })
    }
}

     
    
