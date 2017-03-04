angular.module('enigmaApp').controller('loginCtrl', function($scope, apiService) {

    $scope.loginLocal = () => {
        apiService.loginLocal($scope.loginUsername, $scope.loginPassword);
    };

    $scope.loginAlliedCommand = () => {
        apiService.loginLocal("allied_command", "enigma50");
    };

    $scope.loginAxisDecoder = () => {
        apiService.loginLocal("axis_decoder","rommel1844");
    };

   $scope.loginAdmin = () => {
       apiService.loginLocal("admin", "eisenhower");
   }

});