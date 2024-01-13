import { AddTask } from "../components/AddTask.js";
import { EditTask } from "../components/EditTask.js";
import { TaskList, filters } from "../components/TaskList.js";
import { localStorageFunction, updateCheckbox, taskList } from "./function.js";
export {todos, isTous}
let todos = []
let isTous = false

todos = localStorageFunction(todos)
document.getElementById('tous').addEventListener('click', () => {
    isTous = false
    updateCheckbox(todos)
    console.log(todos);
}) 
document.getElementById('a-faire').addEventListener('click', () => {
    isTous = true
    taskList.innerHTML = ''
    console.log(todos);
    todos.forEach(todo => {
        if(todo.state === false){
            taskList.append(new TaskList(todo));
        }
    })
}) 
document.getElementById('task-finished').addEventListener('click', () => {
    isTous = true
    taskList.innerHTML = ''
    console.log(todos);
    filters.forEach(todo => {
        taskList.append(new TaskList(todo));
        document.querySelectorAll('.state').forEach(chekbox => {
            chekbox.checked = true  
        })
    })
})
                                                                                        