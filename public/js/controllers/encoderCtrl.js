angular.module('enigmaApp').controller('encoderCtrl', function($scope, apiService) {


    var loadContent = () => {
        apiService.loadCountryList().then(countryList => {$scope.countryList = countryList;});
        apiService.loadBonusList().then(bonusList => {$scope.bonusList = bonusList;});
        apiService.loadCipherList().then(cipherList => {$scope.cipherList = cipherList;});
        apiService.loadEncoderMessageList().then(messageList => {
            $scope.messageList = messageList;
        });
    }

    $scope.liveEncodeMessage = () => {

        var test = "this is a test";
        $scope.test = test;

        if(!!$scope.chosenCipher.cipher_word) {
            apiService.encodeMessage($scope.chosenCipher.cipher_word, $scope.inputMessage).then(message => {
                $scope.encodedMessage = message;
            })
        }
    };

    loadContent();

});