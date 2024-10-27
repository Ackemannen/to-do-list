// Selecting DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Modal elements
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveTaskBtn = document.getElementById('save-task-btn');
const closeModal = document.querySelector('.close-modal');

// Dark mode input
const toggleSwitch = document.getElementById('dark-mode-toggle');
let darkMode = localStorage.getItem("darkMode");

// Add the tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Reference to the current task being edited
let taskToEdit = null; 

// Add Task Event Listener for click and enter press
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // Clear input after adding task
    } else {
        alert("Please enter a task!");
    }
});
taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const taskText = taskInput.value.trim();
    
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ""; // Clear input after adding task
        } else {
            alert("Please enter a task!");
        }
    }
});

// Function to Add Task
function addTask(taskText) {
    // Create a new task object
    const task = { text: taskText, completed: false };

    // Add task to the tasks array
    tasks.push(task);
    
    // Save the updated tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Add task to the UI
    renderTask(task);
}

// Function to Render Task (called for both new tasks and loading stored tasks)
function renderTask(task) {
    // Create list item
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed'); // If the task is completed, mark it

    // Create span to hold the task text (so we can edit it later)
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    // Create Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    // Create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Create span to hold the two buttons
    const btnSpan = document.createElement('span');
    btnSpan.classList.add("btn-span");
    btnSpan.appendChild(editBtn);
    btnSpan.appendChild(deleteBtn);
    
    // Append task text and buttons to the list item
    li.appendChild(taskSpan);
    li.appendChild(btnSpan);
    
    // Append list item to task list
    taskList.appendChild(li);

    // Toggle completion when task is clicked
    li.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
            task.completed = !task.completed; // Toggle task completion status
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated status to localStorage
        }
    });

    // Edit task when Edit button is clicked
    editBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent list item click event from firing
        taskToEdit = task; // Store the reference to the task object
        editTaskInput.value = task.text; // Populate the input with the current task text
        editModal.style.display = 'flex'; // Show the modal
    });

    // Delete task when Delete button is clicked
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent list item click event from firing
        taskList.removeChild(li); // Remove task from UI
        tasks = tasks.filter(t => t !== task); // Remove task from array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated array to localStorage
    });
}

// Save the edited task when the Save button is clicked
saveTaskBtn.addEventListener('click', () => {
    if (editTaskInput.value.trim() !== "") {
        taskToEdit.text = editTaskInput.value.trim(); // Update task text
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskList.innerHTML = ``;
        tasks.forEach(renderTask);
        editModal.style.display = 'none'; // Hide the modal
    } else {
        alert("Please enter a valid task.");
    }
});

// Close modal when the close button is clicked
closeModal.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
});

// Load tasks from localStorage and display them
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(renderTask); // Render all tasks in array in localStorage
})

// Darkmode functions
// Function to enable dark mode
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    document.querySelector('.todo-container').classList.add('dark-mode');
    document.querySelector('.modal-content').classList.add('dark-mode');
    localStorage.setItem("darkMode", "enabled"); // Save dark mode status
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    document.querySelector('.todo-container').classList.remove('dark-mode');
    document.querySelector('.modal-content').classList.remove('dark-mode');
    localStorage.setItem("darkMode", "disabled"); // Save dark mode status
}

if (darkMode === "enabled") {
    enableDarkMode();
    toggleSwitch.checked = true; // Keep the toggle in sync
} else {
    disableDarkMode();
    toggleSwitch.checked = false; // Keep the toggle in sync
}

toggleSwitch.addEventListener('change', function() {
    if (toggleSwitch.checked) {
        enableDarkMode(); // Enable dark mode if the toggle is checked
    } else {
        disableDarkMode(); // Disable dark mode if the toggle is unchecked
    }
});;
