let currentEditElement = null;

document.addEventListener('DOMContentLoaded', () => {
    loadTaskLocalStorage()
});

function loadTaskLocalStorage(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        const li = creatTaskElement(task)
        document.getElementById('todo-list').appendChild(li)
    })
};

function creatTaskElement(task){
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.textContent = task

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('edit-btn')
    editBtn.onclick = () => openModal(li,span)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.onclick = () => {
        li.remove()
        deleteTaskFromLocalStorage(task)
    }

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    buttons.appendChild(editBtn)
    buttons.appendChild(deleteBtn)

    li.appendChild(span)
    li.appendChild(buttons)

    return li

};

function openModal(li,span){
    currentEditElement = {li,span}
    document.getElementById('edit-taks-input').value = span.textContent
    document.getElementById('editModal').style.display ='flex'

};

function closeModal(){
    document.getElementById('editModal').style.display ='none'
};

function addTask(){
    const taskInput = document.getElementById('new-task')
    const task = taskInput.value.trim()

    if(task){
        const li = creatTaskElement(task)
        document.getElementById('todo-list').appendChild(li)

        saveTaskToLocalStorage(task)
        taskInput.value = ''
    }
};

function saveTask(){
    const editTask = document.getElementById('edit-taks-input').value.trim()
    if(editTask){
        const originalTask = currentEditElement.span.textContent
        currentEditElement.span.textContent = editTask
        updateTaskInLocalStorage(originalTask, editTask)
        closeModal()
    }
};

function saveTaskToLocalStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push(task)
    localStorage.setItem(tasks, JSON.stringify(tasks))

};

function deleteTaskFromLocalStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.filter(t => t !== task)
    localStorage.setItem(tasks, JSON.stringify(tasks))
};

function  updateTaskInLocalStorage(originalTask, editTask){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const taskIndex = tasks.indexOf(originalTask)
    if(taskIndex > -1){
        tasks[taskIndex] = editTask

    }
    localStorage.setItem(tasks, JSON.stringify(tasks))
};