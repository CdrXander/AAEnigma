angular.module('enigmaApp').controller('loginCtrl', function($scope, apiService) {

    $scope.loginLocal = () => {
        apiService.loginLocal($scope.loginUsername, $scope.loginPassword);
    }
})