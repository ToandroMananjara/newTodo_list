let filters = []
export { filters }
import { todos, isTous } from "../main/index.js";
import { AddTask } from "./AddTask.js";
import { EditTask } from "./EditTask.js";
export class TaskList extends HTMLElement {
    constructor(todo){
        super()
        // this.root = this.attachShadow({ mode: 'open' })
        this.todo = todo
        this.render()
        this.querySelector('.delete').addEventListener('click',()=>{
            this.removeTask(this.todo)
        })
        this.querySelector('#edit-task').addEventListener('click',() =>
            this.editTask(this.todo)
        )
        this.querySelector('.state').addEventListener('click',() =>
            this.stateTask(this.querySelector('.state'), this.todo)
        )
    }
    render(){
        this.innerHTML = `
        <link rel="stylesheet" href="./assets/css/taskListStyle.css">  
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
            <input class = 'state' data-task-id="${this.todo.id}" type ='checkBox' >    
            <span class = 'title'>${this.todo.title}</span>
            <span class = 'id'>${this.todo.id}</span> 
            <span class = 'edit-span'> <i class="fa-solid fa-pencil edit" id = 'edit-task'></i> </span>
            <span class = 'delete'> <i class="fa-solid fa-trash"></i> </span>
      `
    }
   
    removeTask(todo){
        this.remove()
        this.deleteTodoOfArray(todos, todo)    
        this.deleteTodoOfArray(filters, todo)
        this.updateStorage()
    }
    editTask(todo){
        console.log(todo.title);
        if (document.querySelector('add-task')) {
            document.querySelector('add-task').remove()
            document.querySelector('.input').append(new EditTask)
            document.querySelector('edit-task').querySelector('#input-to-do').value = todo.title 
            document.querySelector('edit-task').querySelector('#input-to-do').focus()
            document.querySelector('edit-task').querySelector('#edit').addEventListener('click',()=>{
                console.log(document.querySelector('edit-task').querySelector('#input-to-do').value);
                todo.title = document.querySelector('edit-task').querySelector('#input-to-do').value
                this.querySelector('.title').innerHTML = document.querySelector('edit-task').querySelector('#input-to-do').value;
                document.querySelector('edit-task').remove()
                document.querySelector('.input').append(new AddTask)
                this.updateStorage()
            })    
        }  
    }
    stateTask(checkbox, todo){
        if (checkbox.checked) {
            todo.state = true
            // console.log(todo);
            // console.log(todos);
            if (todo.state === true && isTous === true) {
                this.remove()
            }
            filters = todos.filter(task =>{
                return task.state ===  true
            })
            console.log(filters);
            this.updateStorage()
        }
        else{
            todo.state = false
            console.log(todo);
            console.log(todos);
            console.log(filters);
            filters.forEach(todo => {
                if (todo.state === false && isTous === true) {
                    this.remove()
                }
                if (todo.state === false ) {
                    this.deleteTodoOfArray(filters, todo)
                }
            })
            this.updateStorage()
        }
    }
    deleteTodoOfArray(array, todo){
        let indexRemove = array.findIndex((arr) => {
            return arr.id === todo.id
        })
        array.splice(indexRemove, 1)
        // console.log(array);
    }
    updateStorage(){
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}
customElements.define('task-list', TaskList)