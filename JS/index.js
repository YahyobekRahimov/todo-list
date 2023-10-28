const COMMENT_INPUT = document.getElementById('comment');
const SUBMIT_BUTTON = document.getElementById('submit-btn');
const unorderedList = document.querySelector('.todo-list-nav');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let checkboxes = document.getElementsByClassName('checkbox');
const REMOVE_BUTTON = document.getElementsByClassName('remove-button');

checkbox();
function checkbox() {
    for (let i = 0; i < checkboxes.length; i++) {
        const element = checkboxes[i];
        element.addEventListener('change', function() {
            if (element.checked) {
                console.log(tasks);
                tasks[i].isChecked = true;
                console.log(isChecked);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                addCheckboxEffect(i);
            }
        })
    }
}
clickRemoveButton();
clickRemoveButton();
function clickRemoveButton() {
    for (let i = 0; i < REMOVE_BUTTON.length; i++) {
        const element = REMOVE_BUTTON[i];
        element.addEventListener('click', function() {
           tasks.splice(i, 1);
           localStorage.setItem('tasks', JSON.stringify(tasks));     
           const listItems = document.getElementsByTagName("li");
            listItems[i].style.display = 'none';
        });
        
    }
}
function Task(taskTitle, isChecked, taskNumber) {
    this.taskTitle = taskTitle;
    this.isChecked = isChecked;
    this.taskNumber = taskNumber;
 }
 function addCheckboxEffect(elementNumber) {
     const taskTitle = document.querySelectorAll('span.task-text');
     const listItems = document.getElementsByTagName("li");
     listItems[elementNumber].style.opacity = '0.5';
     taskTitle.item(elementNumber).style.textDecoration = 'line-through';
 }
document.addEventListener('DOMContentLoaded', function() {
    debugger;
    checkbox();
    clickRemoveButton();
   for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    const taskTitle = element.taskTitle;
    let li = document.createElement('li');
    li.innerHTML = `<input onclick='checkbox()' class="checkbox" type="checkbox">
    <span class="task-text">${taskTitle}</span>
    <button onclick='clickRemoveButton()' class="remove-button">
        <img src="./images/8665900_trash_can_icon.svg" alt="trash can">
    </button>`;
    unorderedList.appendChild(li);
    if (element.isChecked) {
        checkboxes[i].setAttribute('checked', "checked");
        addCheckboxEffect(i);
    }
   } 
    SUBMIT_BUTTON.addEventListener('click', function() {
        let taskTitle = COMMENT_INPUT.value;
        let li = document.createElement("li");
        li.innerHTML = `<input onclick='checkbox()' class="checkbox" type="checkbox">
        <span class="task-text">${taskTitle}</span>
        <button onclick="clickRemoveButton()" class="remove-button">
            <img src="./images/8665900_trash_can_icon.svg" alt="trash can">
        </button>`;
        let newTask = new Task(taskTitle, false, tasks.length + 1);
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        unorderedList.appendChild(li);
    });

})

