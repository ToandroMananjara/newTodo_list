const renderAdd = `        
    <link rel="stylesheet" href="./assets/css/todoInputStyle.css">
    <div class="label">
        <label for="">New Todo :</label><br>
    </div>
    <div class="input">
        <input type="text" id="input-to-do">
        <button id = 'add'>Add</button>
    </div>
`
import { todos } from "../main/index.js";
import { TaskList } from "../components/TaskList.js";
export class AddTask extends HTMLElement {
    constructor(){
        super()
        this.renderAdd()
        this.querySelector('#add').addEventListener('click', () => this.addTask());
    }
    renderAdd(){
        this.innerHTML = renderAdd
    }
    addTask(){
        const newTaskInput = this.querySelector('#input-to-do')
        this.title = newTaskInput.value
        const ul = document.querySelector('ul')
        const taskInput = newTaskInput.value.trim()
        if (taskInput !== '' ) {
            let todo = {
                id : `${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`,
                title : `${this.title}`,
                state : false 
            }
            ul.append(new TaskList(todo))
            todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            newTaskInput.value = ''
        }
    
    }
  
}
customElements.define('add-task', AddTask)