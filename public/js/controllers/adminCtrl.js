angular.module('enigmaApp').controller('adminCtrl', function ($scope, apiService) {
        $scope.tabs = [{
            title: 'Tasks',
            url: './views/admin_tabs/tasks.html'
        }, {
            title: 'Messages',
            url: './views/admin_tabs/messages.html'
        }, {
            title: 'Ciphers',
            url: './views/admin_tabs/ciphers.html'
        }, {
            title: 'Bonuses',
            url: './views/admin_tabs/bonuses.html'
        }];

        $scope.currentTab = './views/admin_tabs/tasks.html';

        $scope.onClickTab =  (tab) => {
            $scope.currentTab = tab.url;
        };

        $scope.isActiveTab = (tabUrl) => {
            return tabUrl == $scope.currentTab;
        };


        $scope.loadMessages = () => {
            apiService.loadAdminMessageList().then(messageList => {
                $scope.messageList = messageList;
            })
        };

        $scope.loadMessage = (messageId) => {
            apiService.getFullMessage(messageId).then(message => {
                $scope.fullMessage = message;
            });
        };

        $scope.loadStatuses = () => {
              apiService.loadStatusList().then(statusList => {
                  $scope.statusList = statusList;
              })
        };

        $scope.loadTasks = () => {
            apiService.getTaskList().then(taskList => {
                $scope.taskList = taskList;
            })
        };


        $scope.selectTask = (task_id) => {
            for(var i = 0; i < $scope.taskList.length; i++) {
                if($scope.taskList[i].id === task_id) {
                    $scope.selectedTask = $scope.taskList[i];
                    break
                }
            }
        };

        $scope.completeTask = (task_id) => {
          apiService.completeTask(task_id).then(response => {
             $scope.selectedTask = {};
          });
        };

        $scope.updateMessageStatus = (newStatusId) => {
            var messageId = $scope.fullMessage.id;
            var messageStatusObj = {
                message_id:messageId,
                new_status_id:newStatusId
            };
            apiService.updateMessageStatus(messageStatusObj).then(response => {
                $scope.fullMessage = {};
            });

        };

        //Spin up the drives!
        $scope.loadMessages();
        $scope.loadTasks();
        $scope.loadStatuses();


});