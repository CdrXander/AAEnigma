angular.module('enigmaApp').service('apiService', function($http, $q, $location) {


    //Helper Methods

    function genericGet(url) {
        var deferred = $q.defer();
        $http.get(url)
            .success(response => {
                deferred.resolve(response);
            });
        return deferred.promise
    }

    function genericPost(url, data) {
        var deferred = $q.defer();
        $http.post(url, data)
            .success(response => {
                deferred.resolve(response);
            });
        return deferred.promise;
    }


    //AUTHENTICATION    =   =   =   =   =   =   =   =   =   =   =   =
    this.loginLocal = (username, password) => {
        var deferred = $q.defer();
        var url = "/api/auth/login";
        var data = {
            username:username,
            password:password
        };

        $http.post(url, data)
            .success(response => {

                if(response.username === 'admin') {
                    $location.url('/admin');
                } else if ( response.username === 'allied_command' ||
                    response.username === 'axis_command'){
                    $location.url('/encoder');
                } else {
                    $location.url('/decoder');
                }

                deferred.resolve(response);
        });
        return deferred.promise;
    };

    //LOGISTICS =   =   =   =   =   =   =   =   =   =   =   =   =   =

    this.loadCountryList = () => {
        return genericGet("/api/country/list");
    };

    this.loadStatusList = () => {
        return genericGet("/api/status/list");
    };

    //BONUSES
    this.saveBonus = (bonusObj) => {
        return genericPost("/api/bonus", bonusObj);
    };

    this.loadBonusList = () => {
        return genericGet("/api/bonus/list");
    };

    this.findBonusById = bonusId => {
        return genericGet("/api/bonus/" + bonusId);
    };


    //CIPHERS
    this.saveCipher = (cipherObj) => {
        return genericPost("/api/cipher", cipherObj);
    };

    this.loadCipherList = () => {
        return genericGet("/api/cipher/list");
    };


    //TASKS

    this.completeTask = (task_id) => {
        var data = {
            id:task_id,
            completed:true
        };

        return genericPost('/api/task',data);
    };

    this.getTaskList = () => {
        return genericGet('/api/task/list');
    };

//MESSAGES  =   =   =   =   =   =   =   =   =   =   =   =   =   =

    this.sendMessage = (countryId, bonusId, cipherId, cipherWord, messagePlain) => {
        var deferred = $q.defer();
        var url = "/api/message";
        var data = {
            country_id:countryId,
            bonus_id:bonusId,
            cipher_id:cipherId,
            cipher_word:cipherWord,
            message_plain:messagePlain
        };

        $http.post(url,data)
            .success(response => {
                deferred.resolve(true);
            })
            .error(response => {
                deferred.resolve(false);
            });

        return deferred.promise;
    };

    this.encodeMessage = (cipherWord, message) => {
        var data = {
            cipher_word: cipherWord,
            message_plain: message
        };
        return genericPost('/api/message/encode', data);
    };

    this.guessCipher = (messageId, cipherId) => {
        var data = {
            message_id:messageId,
            guessed_cipher_id:cipherId
        };
        return genericPost('/api/message/guess', data);
    };

    this.counterMessage = (messageId) => {
        var data = {
            message_id:messageId
        };
        return genericPost('api/message/counter', data);
    };

    this.getFullMessage = message_id => {
        return genericGet("/api/message/full/" + message_id);
    };

    this.getLimitedMessage = message_id => {
        return genericGet("/api/message/limited/" + message_id);
    };

    this.loadEncoderMessageList = () => {
        return genericGet("/api/message/list/encoder");
    };

    this.loadDecoderMessageList = () => {
        return genericGet("/api/message/list/decoder");
    };

    this.loadAdminMessageList = () => {
        return genericGet("/api/message/list/admin");
    };

    this.updateMessageStatus = (messageStatusObj) => {
        return genericPost('/api/message/status', messageStatusObj);
    };





});