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
let links = document.querySelectorAll('.task-menu')
links.forEach((link ,index)=>{
    link.addEventListener('click', (e)=> {
        links.forEach(otherLink => {
            otherLink.style.background = '#F6F4F3'; // Réinitialiser à la couleur par défaut (ou utilisez une autre valeur)
            otherLink.style.color = '#333333' 
        });

        links[index].style.background = '#007BFF'
        links[index].style.color = ' #f5f5f5'  
    })
})                                                                                        