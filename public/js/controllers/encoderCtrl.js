angular.module('enigmaApp').controller('encoderCtrl', function($scope, apiService) {


    $scope.loadContent = () => {
        apiService.loadCountryList().then(countryList => {$scope.countryList = countryList;});
        apiService.loadBonusList().then(bonusList => {$scope.bonusList = bonusList;});
        apiService.loadCipherList().then(cipherList => {$scope.cipherList = cipherList;});
        apiService.loadEncoderMessageList().then(messageList => {$scope.messageList = messageList;});
    };

    $scope.reloadMessages = () => {
        apiService.loadEncoderMessageList().then(messageList => {$scope.messageList = messageList;});
    };

    $scope.loadFullMessage = (messageId) => {
        apiService.getFullMessage(messageId).then(fullMessage => {
            $scope.fullMessage = fullMessage;
        })
    };

    $scope.liveEncodeMessage = () => {

        var test = "this is a test";
        $scope.test = test;

        if(!!$scope.chosenCipher.cipher_word) {
            apiService.encodeMessage($scope.chosenCipher.cipher_word, $scope.inputMessage).then(message => {
                $scope.encodedMessage = message;
            })
        }
    };

    $scope.updateDefaultMsg = () => {
        $scope.inputMessage = $scope.chosenBonus.default_message;
        $scope.liveEncodeMessage();
    }

    $scope.validateMessage = () => {
        if(!!$scope.chosenCountry && !!$scope.chosenBonus && !! $scope.chosenCipher && !!$scope.inputMessage) {

            $scope.missingParams = false;
            $scope.sendMessage();
        } else {
            $scope.missingParams = true;
        }
    };

    $scope.sendMessage = () => {
        apiService.sendMessage(
            $scope.chosenCountry.id,
            $scope.chosenBonus.id,
            $scope.chosenCipher.id,
            $scope.chosenCipher.cipher_word,
            $scope.inputMessage
        ).then( result => {
            if(result) {
                $scope.inputMessage = '';
                $scope.encodedMessage = '';
                $scope.messageSent = true;
                $scope.messageFailed = false;
            } else {
                $scope.messageSent = false;
                $scope.messageFailed = true;
            }
        })
    };




    //Initialization of the View
    $scope.loadContent();
    $scope.messageSent = false;
    $scope.messageFailed = false;



});