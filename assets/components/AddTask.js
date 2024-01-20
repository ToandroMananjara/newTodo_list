const renderAdd = `        
    <style>
        #input-to-do,.edit-input{
            border: none;
            outline: none;
            box-shadow: inset 1px 1px 1px 1px#dcd8d8;
            height: 40px;
            border-radius: 15px;
            padding: 0 10px;
        }
        .label{
            width: 100%;
        }
        button{
            border-radius: 15px;
            cursor: pointer;
        }
        .label-edit{
            display: flex;
            align-items: center;
        }
        .input{
            display: flex;
            flex-direction:row;
            justify-content: center;
            width: 100%;
            margin: 0;
            
        }
        
        #add,#edit{
            width: 100px;
            margin-left: 5px;
        }
        #add, #edit{
            width: 90px;
            background: #007BFF;
            color: #fff;
            border: solid 1px #007BFF;
        }
        
        #input-to-do{
            width: 100%;
        }
        
        
        @media only screen and (max-width:600px){
            .container{
                width: 100%;
            }
        }
    </style>
    <div class="label">
        <label for="">New Todo :</label><br>
    </div>
    <div class="input">
        <input type="text" id="input-to-do">
        <button id = 'add'>Add</button>
    </div>
`
import { todos } from "../main/index.js";
import { TaskList, filters } from "../components/TaskList.js";
import { tousCount } from "../main/function.js";
export class AddTask extends HTMLElement {
    constructor(){
        super()
        this.renderAdd()
        this.querySelector('#add').addEventListener('click', () => this.addTask());
        this.querySelector('#input-to-do').addEventListener('keydown', (event)=> {
            // Vérifiez si la touche pressée est "Enter" (code 13)
            if (event.key === 'Enter') {
                // Ajoutez votre logique ici pour la touche "Enter"
                this.addTask()
                console.log(todos);
                console.log(filters);
            }
        });
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
                id : `${(new Date).getHours()}-${(new Date).getMinutes()}-${(new Date).getSeconds()}`,
                title : `${this.title}`,
                state : false ,
                isMore : false,  
                note : '',
                dateEcheance : '',
                priorité : 'Aucune'
            }
            console.log(todo);
            ul.prepend(new TaskList(todo))
            todos.unshift(todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            newTaskInput.value = ''
        }
        tousCount(todos)
    }
  
}
customElements.define('add-task', AddTask)