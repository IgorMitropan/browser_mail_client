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
        /*this._$http.delete(this._BASE_URL + '/users')
            .then(() => this._$http.post(this._BASE_URL+'/users', JSON.stringify(this.DB.users)));
        
        this._$http.delete(this._BASE_URL + '/letters')
            .then(() => this._$http.post(this._BASE_URL+'/letters', JSON.stringify(this.DB.letters)));*/

        this._Restangular.all('users').getList().then(users => {
            users.remove();
            this.DB.users.forEach(user => {
                users.post(user);
            });
        });

         this._Restangular.all('letters').getList().then(letters => {
             letters.remove();
             this.DB.letters.forEach(letter => {
                 letters.post(letter);
             });
             
         })
    }
}

     
    
