// Selecting DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Modal elements
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveTaskBtn = document.getElementById('save-task-btn');
const closeModal = document.querySelector('.close-modal');

let taskToEdit = null; // Reference to the current task being edited

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
    // Create list item
    const li = document.createElement('li');

    // Create span to hold the task text (so we can edit it later)
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

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
        // Ensure we're not clicking on buttons inside the list item
        if (event.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
        }
    });

    // Edit task when Edit button is clicked
    editBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent list item click event from firing
        taskToEdit = taskSpan; // Store the reference to the task's span
        editTaskInput.value = taskSpan.textContent; // Populate the input with the current task text
        editModal.style.display = 'flex'; // Show the modal
    });

    // Delete task when Delete button is clicked
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent list item click event from firing
        taskList.removeChild(li);
    });
}

// Save the edited task when the Save button is clicked
saveTaskBtn.addEventListener('click', () => {
    if (editTaskInput.value.trim() !== "") {
        taskToEdit.textContent = editTaskInput.value.trim(); // Update task text
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
