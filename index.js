// Create variable
const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');

// Save to local storage after task is added
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.taskDiv li')).map(
    task => task.innerText
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage and render when page loaded
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach((taskText) => addTaskToList(taskText));
    }
}

// Event Listener for add button
addTask.addEventListener("click", function () {
    addTaskToList(inputTask.value);
    saveTasks(); // Save tasks after task is added
    inputTask.value = "";
});

function addTaskToList(taskText) {
    if (taskText === "") {
        alert("Please Enter a Task");
        return;
    }

    // Create div element that will hold the task and its actions.
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");

    let li = document.createElement("li");
    li.innerText = taskText;
    taskDiv.appendChild(li);

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa-solid fa-check">Check</i>';
    checkBtn.classList.add("checkTask");
    taskDiv.appendChild(checkBtn);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "<i>Edit</i>";
    editBtn.classList.add("editTask");
    taskDiv.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can">Delete</i>';
    deleteBtn.classList.add("deleteTask");
    taskDiv.appendChild(deleteBtn);

    // Delete items from list
    deleteBtn.addEventListener("click", function (e) {
        taskDiv.remove(); // remove the task box
        saveTasks(); // saving the remaining tasks.
    });

    // Check item decoration
    let status = "unchecked";
    checkBtn.addEventListener("click", function () {
        if (status == "unchecked") {
            li.style.textDecoration = "line-through";
            li.style.backgroundColor = "green";
            status = "checked";
        } else {
            li.style.textDecoration = "none";
            li.style.backgroundColor = "rgba(250, 235, 215, 0.514)";
            status = "unchecked";
        }
    });

    // Edit item
    editBtn.addEventListener("click", function () {
        taskDiv.remove();
        inputTask.value = li.innerText;
        saveTasks(); // saving the remaining tasks.
    });

    taskContainer.appendChild(taskDiv);
}

// Load tasks when page is loaded
loadTasks();