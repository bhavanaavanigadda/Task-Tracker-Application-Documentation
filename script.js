document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                ${task}
                <div class="task-actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });

        // Attach event listeners for Edit and Delete buttons
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const newTask = prompt('Edit task:', tasks[index]);
                if (newTask) {
                    tasks[index] = newTask;
                    renderTasks();
                }
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    renderTasks();
});
