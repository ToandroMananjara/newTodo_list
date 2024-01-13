const renderEdit = `
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
        <label for="">Edit Todo :</label><br>
    </div>
    <div class="input">
        <input type="text" id="input-to-do">
        <button id = 'edit'>Edit</button>
    </div>
`
import { todos } from "../main/index.js";
import { TaskList } from "../components/TaskList.js";
export class EditTask extends HTMLElement {
    constructor(){
        super()
        this.renderEdit()
    }

    renderEdit(){
        this.innerHTML = renderEdit
    }
    
}
customElements.define('edit-task', EditTask)