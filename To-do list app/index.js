let tasksList = [
    {
    task : "learn css",
    taskCompleted : false
    },
    {
        task : "learn html",
        taskCompleted : false
    },
    {
        task : "learn javascript",
        taskCompleted : false
    }
]

// {
//     task : "task description",
//     taskCompleted : false
// }

let localData  = localStorage.getItem("tasksList")
console.log(localData)
if(localData===null){
    tasksList=[]
}
else{
    tasksList = JSON.parse(localData)
}


let userInput = document.getElementById("user-input") 
let addButton = document.getElementById("add-button")
let todoItemListContainer = document.getElementById("todo-item-list-container")
let saveBtn = document.getElementById("save-btn")

saveBtn.onclick = function(){
    localStorage.setItem("tasksList", JSON.stringify(tasksList))
}

function onAddButtonClick(){
    let userInputValue = userInput.value 
    let taskObj = {
        task: userInputValue,
        taskCompleted: false
    }

    tasksList.push(taskObj)
    createTodoItem(taskObj)
    userInput.value= ""

    console.log(tasksList)

}


function createTodoItem (taskObj){
    let todoItemContainer  = document.createElement('div')
    todoItemContainer.classList.add("d-flex","align-items-start","todo-item-container")
    // create checkbox  => <input type="checkbox" checked=true />

    let checkboxElement = document.createElement("input")
    checkboxElement.type ="checkbox"
    checkboxElement.classList.add("checkbox")
    checkboxElement.checked = taskObj.taskCompleted

    checkboxElement.onclick = function(){
        taskDescription.classList.toggle("task-complete")  
        let todoItemIndex = tasksList.indexOf(taskObj)
        tasksList[todoItemIndex].taskCompleted = !tasksList[todoItemIndex].taskCompleted
        console.log(tasksList)
    }

    // create description para 
    let taskDescription = document.createElement("p")
    taskDescription.textContent = taskObj.task
    taskDescription.classList.add("task-description")
    if(taskObj.taskCompleted==true){
        taskDescription.classList.add("task-complete")
    }

    // create delete button
    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>"
    deleteBtn.onclick = function(){
        let todoItemIndex = tasksList.indexOf(taskObj)
        tasksList.splice(todoItemIndex,1)
        console.log(tasksList)
        todoItemListContainer.removeChild(todoItemContainer)
    }


    todoItemContainer.appendChild(checkboxElement)
    todoItemContainer.appendChild(taskDescription)
    todoItemContainer.appendChild(deleteBtn)

    todoItemListContainer.appendChild(todoItemContainer)

    

}


addButton.onclick = onAddButtonClick

for(let i of tasksList){
    createTodoItem(i)
}
