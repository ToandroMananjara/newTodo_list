const renderEdit = `
    <link rel="stylesheet" href="./assets/css/todoInputStyle.css">    
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