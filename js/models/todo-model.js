angular.module('todo.model', [])
    .service('ToDoModel', function () {
        var model = this,
            taskList = [
                {
                    description: 'To feed the cat',
                    done: false,
                    id: 1
                }
            ];

        model.getTasks = function(){
            return taskList;
        }

        model.getTaskForEdit = function(id){
            var currentTask;
            taskList.forEach(function(item){
                if(id === item.id){
                    currentTask = item;
                }
            })
            return currentTask;
        }

        model.addTask = function(task){
            task.id = taskList.length+1;
            taskList.push(task);
        }

        model.editTask = function(task,id){
            taskList.forEach(function(item){
                if(item.id === id){
                    item.description = task.description;
                    item.done = !!task.done;
                }
            })
        }

        model.deleteResolvedTasks = function(){
            var template = taskList.filter(function(item){
                return !item.done;
            });
            taskList = template;
        }
    })
;