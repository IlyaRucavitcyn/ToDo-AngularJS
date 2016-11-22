var app = angular.module('toDoApp', ['ui.router', 'todo.model']);

app
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('taskEdit', {
                url: '/task/edit',
                templateUrl: 'deal-edit.tmpl.html',
                controller: 'TodoListCtrl'
            })
            .state('default',{
                url:'/',
                controller: 'TodoListCtrl'
            });
    })

    .controller('TodoListCtrl', function ($scope, $state, ToDoModel) {

        function updateTaskList(container){
            $scope.currentList = ToDoModel.getTasks();
        }

        updateTaskList();

        $scope.submitDeal = function (deal) {
            if (deal.description) {
                ToDoModel.addTask(deal);
                $scope.currentDeal = {};
            }
        }
        $scope.cleanUp = function () {
            ToDoModel.deleteResolvedTasks();
            updateTaskList();
        }

        $scope.setTaskForEdit = function (id) {
            $state.go('taskEdit');
            $scope.taskUnderEdition = ToDoModel.getTaskForEdit(id);
            console.log($scope.taskUnderEdition);
        }

        $scope.saveTask = function(task,id){
            ToDoModel.editTask(task,id);
            updateTaskList();
            $scope.stopEditing();
        }

        $scope.stopEditing = function(){
            $state.go('default');
        }
    });