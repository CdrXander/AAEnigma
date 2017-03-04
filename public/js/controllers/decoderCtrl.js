/**
 * Created by Xander on 3/3/2017.
 */

angular.module('enigmaApp').controller('decoderCtrl', function($scope, apiService) {


    $scope.loadContent = () => {
        apiService.loadCipherList().then(cipherList => {$scope.cipherList = cipherList;});
        apiService.loadDecoderMessageList().then(messageList => {$scope.messageList = messageList;});
    };

    $scope.loadLimitedMessage = (messageId) => {
      apiService.getLimitedMessage(messageId).then(message => {
          $scope.selectedMessage = message[0];
      });
    };

    $scope.guessCipher = () => {
        $scope.targetMessageId = $scope.selectedMessage.id;
        apiService.guessCipher($scope.targetMessageId, $scope.selectedCipher.id).then(guessResult => {
            $scope.displayResult = true;
            $scope.guessResult = guessResult;
        });
    };

    $scope.counterMessage = () => {
        apiService.counterMessage($scope.targetMessageId);
        $scope.displayResult=false;
        $scope.selectedMessage = {};
    };

    $scope.clearWork = () => {
        //TODO Update message_status to a status which doesn't let the opponent know that it has been broken

        $scope.displayResult=false;
        $scope.selectedMessage = {};
    };

    $scope.loadContent();
    $scope.displayResult = false;


});