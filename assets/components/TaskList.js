let filters = []
export { filters }
import { tousCount, aFaireCount, taskFinished } from "../main/function.js";
import { todos, isTous } from "../main/index.js";
import { AddTask } from "./AddTask.js";
import { EditTask } from "./EditTask.js";
export class TaskList extends HTMLElement {
    constructor(todo){
        super()
        // this.root = this.attachShadow({ mode: 'open' })
        this.todo = todo
        this.isMore = false
        this.render()

        this.querySelector('#notes').innerHTML = this.todo.note
        this.querySelector('#priorite').value = this.todo.priorite  

        this.prioriteColor(this.todo.priorite, this.querySelector('.priorite-color'))

        this.querySelector('.delete').addEventListener('click',()=>{
            this.removeTask(this.todo)
        })

        this.querySelector('#edit-task').addEventListener('click',() =>
            this.editTask(this.todo)
        )

        this.querySelector('.state').addEventListener('click',() =>{
            this.stateTask(this.querySelector('.state'), this.todo)
            aFaireCount(todos)
            taskFinished()
        })

        this.querySelector('.item-container').addEventListener('click', ()=>{
            document.querySelectorAll('.more').forEach(more =>{
                more.style.display = 'none'
            })
            if(this.todo.isMore === false){
                todos.forEach((todo, index)=>{
                    todo.isMore = false
                })
                this.todo.isMore = true 
                this.querySelector('.more').style.display = 'flex'
            }
            else{
                this.todo.isMore = false
                this.querySelector('.more').style.display = 'none'
            }        
        })

        this.querySelector('.state').addEventListener('click', (event)=>{
            event.stopPropagation()
        })
        
        this.querySelector('#notes').addEventListener('change', ()=>{
            this.todo.note =  this.querySelector('#notes').value
            this.updateStorage()
        })
        
        this.querySelectorAll('.getDate').forEach(elt =>{
            elt.addEventListener('click', ()=>{
                this.todo.dateEcheance = elt.innerHTML
                this.querySelector('.date-echeance').innerHTML = this.todo.dateEcheance
                this.updateStorage()
            })
        })

        this.querySelector('#getDate').addEventListener('change', ()=>{
            this.todo.dateEcheance = this.querySelector('#getDate').value
            this.querySelector('.date-echeance').innerHTML = this.todo.dateEcheance
            this.updateStorage()
        })
        
        this.querySelector('#priorite').addEventListener('click',(event)=>{
            event.stopPropagation()
            switch (this.querySelector('#priorite').value) {
                case 'aucune':
                    this.querySelector('.priorite-color').style.background = '#fff'
                    break;
                case 'basse':
                    this.querySelector('.priorite-color').style.background = 'orange'
                    break;
                case 'moyenne':
                    this.querySelector('.priorite-color').style.background = 'blue'
                    break;
                case 'haute':
                    this.querySelector('.priorite-color').style.background = 'red'
                break;                    
                default:
                    break;
            }
            this.todo.priorite = this.querySelector('#priorite').value
            console.log(todos);
            this.updateStorage()
        })
    }
    render(){
        this.innerHTML = `
        <style>
            /* @font-face {
                font-family: inter;
                src: url(../fonts/static/Inter-Regular.ttf);
            } */

            .item-container{
                width: 100%;
                position: relative;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                padding-bottom:20px; 
                border-bottom :1px solid black; 
            }
            .todo-item{
                display: flex;
                
            }


            .check-box{
                margin: 0;
            }
            .state-ok{
                margin: 0 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30%;
                text-align: center;
                
            }

            .edit-span{
                width: 30%;
                display: flex;
                justify-content: space-around;
                color: green;
                margin: 0;
            }
            .delete{

            }
            #edit-task:hover{
                cursor: pointer;
            }
            .delete:hover{
                cursor: pointer;
            }
            .id{
                width: 50px;
                display: flex;
                justify-content: center;
            }
            .title{
                width: 100%;
                margin: 0;
                text-align: left;
                padding-left: 10px;
                
            }
            .status{
                text-align: center; 
                margin: 0;
                display: flex;
                justify-content: center;
            }
            .more{
                display: none;
                justify-content: space-evenly;
                width: 100%;
                z-index:3; 
                background: #fff;  
                margin-top:10px;  
            }
            .note{
                margin-right: 10px;
            }
            textarea{
                padding: 10px;
            }
            .echeance {
                display: flex;
                flex-direction: column;
                position: relative;
            }
            .echeance span:hover{
                cursor: pointer;
            }
            #getDate:hover{
                cursor: pointer;
            }
            .echeance .date_{
                display: inline-flex;
                justify-content: center;
                align-items: center;
                border: 1px solid black;
                width: 120px;
                height: 30px;
            }
            .priorite{
                width: 100%;
                margin-top: 20px;
                position: relative;
            }
            #priorite{
            
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 375px;
                height: 30px;
                border: 1px solid black;
            }
            .date input {
                height: 100%;
                border: none;
                margin: 0;
            }

            .suppr-btn, .edit-btn{ 
                width: 100px;
                height: 30px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                background: red;
                border: 1px solid black;
                
            }
            .edit-btn{
                background: green;
            }
            .button{
                display: flex;
                gap:10px;
                position: absolute;
                right: 0;
                bottom: 10px;
                z-index: 2;
            }
            .echeance-item{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
            }
            .date-echeance{
                width: 90px;
                text-align:right;
                color: black;
                margin-right:20px; 
            }
            .more-icon{
                position: absolute;
                right: 0;
                width: fit-content;
            }
            @media only screen and (max-width:1023px){
                .more{
                    flex-direction:column;
                }
                .button{
                    margin-top:20px;
                    position: relative;
                    justify-content:center;
                }
                #priorite{
                    width: 100%;
                }
                textarea{
                    width: 100%;
                }
                .date{
                    display: inline-block;
                }
                .echeance-item{
                    width: 100%;
                    display: flex;
                    justify-content:start; 
                    align-items: center;
                    gap: 5px;
                }
            }
            
            select:hover{
                cursor: pointer;
            }
            .priorite-color{
                position: absolute;
                left:0;
                z-index:3;
                background: #fff;
                width: 10px;
                height: 100%;
            }
        
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
            <div class="priorite-color"></div>
            <div class="item-container">
                <input class = 'state' data-task-id="${this.todo.id}" type ='checkBox' >    
                <span class = 'title'>${this.todo.title}</span>
                <span class = 'date-echeance'>${this.todo.dateEcheance}</span>
                <span class = 'more-icon'><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
           </div>
           <div class = "more">
                <div class="note">
                    <label for="note">Notes</label><br>
                    <textarea name="note" id="notes"cols="30" rows="10" placeholder="" >${this.todo.note}</textarea>    
                </div>
                 <div class="echeance">
                    <div>
                        <span>Date d'echeance</span><br>
                        <div class = "echeance-item">
                            <span class = "aujourdhui date_ getDate">Aujourd'hui</span>
                            <span class="demain date_ getDate">Demain</span>
                            <span class="date date_ "><input type="date" value="Aujourd'hui" id="getDate"></span>
                        </div>
                    </div>
                
                <div class="priorite">
                    <span>Priorité</span><br>
                    <select name="" id="priorite">
                        <option value="aucun">Aucun</option>
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                    </select>
                </div>
                <div class="button">
                    <span class="edit-btn" id = 'edit-task'>Editer</span>    
                    <span class="suppr-btn delete">Supprimer</span>
                </div>
            </div>
      `
    }
    
    removeTask(todo){
        this.remove()
        this.deleteTodoOfArray(todos, todo)    
        this.deleteTodoOfArray(filters, todo)
        tousCount(todos)
        aFaireCount(todos)
        taskFinished()
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
            document.querySelector('edit-task').querySelector('#input-to-do').addEventListener('keydown', (event)=> {
                // Vérifiez si la touche pressée est "Enter" (code 13)
                if (event.key === 'Enter') {
                    console.log(document.querySelector('edit-task').querySelector('#input-to-do').value);
                    todo.title = document.querySelector('edit-task').querySelector('#input-to-do').value
                    this.querySelector('.title').innerHTML = document.querySelector('edit-task').querySelector('#input-to-do').value;
                    document.querySelector('edit-task').remove()
                    document.querySelector('.input').append(new AddTask)
                    this.updateStorage()
                }
            });
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
    prioriteColor(priorite, priorite_color){
        switch (priorite) {
            case 'aucune':
                priorite_color.style.background = '#fff'
                break;
            case 'basse':
                priorite_color.style.background = 'orange'
                break;
            case 'moyenne':
                priorite_color.style.background = 'blue'
                break;
            case 'haute':
                priorite_color.style.background = 'red'
            break;                    
            default:
                break;
        }
    }
    updateStorage(){
        localStorage.setItem('todos', JSON.stringify(todos))
    }

}
customElements.define('task-list', TaskList)