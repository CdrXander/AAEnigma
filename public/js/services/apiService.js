angular.module('enigmaApp').service('apiService', function($http, $q, $location) {


    //Helper Methods

    function genericGet(url) {
        var deferred = $q.defer();
        $http.get(url)
            .success(response => {
                deferred.resolve(response);
            })
        return deferred.promise
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
                    console.log("admin");
                } else if ( response.username === 'allied_command' ||
                    response.username === 'axis_command'){
                    $location.url('/encoder');
                } else {
                    console.log("decoder");
                }

                deferred.resolve(response);
        });
        return deferred.promise;
    };

    //LOGISTICS =   =   =   =   =   =   =   =   =   =   =   =   =   =

    this.loadCountryList = () => {
        return genericGet("/api/country/list");
    };

    this.loadBonusList = () => {
        return genericGet("/api/bonus/list");
    };

    this.loadCipherList = () => {
        return genericGet("/api/cipher/list");
    };

    this.findBonusById = bonusId => {
        return genericGet("/api/bonus/" + bonusId);
    }



    //MESSAGES  =   =   =   =   =   =   =   =   =   =   =   =   =   =
    this.loadEncoderMessageList = () => {
        return genericGet("/api/message/list/encoder");
    }

    this.encodeMessage = (cipherWord, message) => {
        var deferred = $q.defer();
        var url = "/api/message/encode";
        var data = {
            cipher_word: cipherWord,
            message_plain:message
        }

        $http.post(url,data)
            .success(response => {
                deferred.resolve(response);
            });
        return deferred.promise;
    }

    this. 


});