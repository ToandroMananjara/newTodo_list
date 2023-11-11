import { AddTask } from "../components/AddTask.js";
import { EditTask } from "../components/EditTask.js";
import { TaskList, filters } from "../components/TaskList.js";
const todos = []
export {todos}

document.getElementById('task-finished').addEventListener('click', () => {
    let taskList = document.querySelector('#task-list')
    taskList.innerHTML = ''
    console.log(todos);
    filters.forEach(todo => {
        taskList.append(new TaskList(todo));
    })
    
})
document.getElementById('tous').addEventListener('click', () => {
    let taskList = document.querySelector('#task-list')
    taskList.innerHTML = ''
    console.log(todos);

    todos.forEach(todo => {
        taskList.append(new TaskList(todo));
    })
})    