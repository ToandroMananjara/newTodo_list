import { TaskList, filters } from "../components/TaskList.js";
export { localStorageFunction, updateCheckbox, taskList}
let taskList = document.querySelector('#task-list')  
const updateCheckbox = (todos)=>{
    taskList.innerHTML = ''
    todos.forEach(todo => {
        if (todo.state === true) {
            taskList.append(new TaskList(todo));
            const correspondingCheckbox = document.querySelector(`.state[data-task-id="${todo.id}"]`);
            if (correspondingCheckbox) {
                correspondingCheckbox.checked = true;
            }
        }
        else{
            taskList.append(new TaskList(todo));
        }
    })
}
const localStorageFunction = (todos) => {
    let todosInStorage = localStorage.getItem('todos')?.toString()
    if (todosInStorage) {
        todos = JSON.parse(todosInStorage)
        console.log(todos);  
        console.log(todosInStorage);
        updateCheckbox(todos)       
        let filter = todos.filter(todo => {
            return todo.state === true
        })
        filter.forEach(elt => {
            filters.push(elt)
        })
    }
    return todos
}