// Obtener los elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Arreglo para almacenar las tareas
let tasks = [];

// Función para agregar una tarea
function addTask(taskText) {
    // Crear un objeto de tarea con un ID único
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Añadir la tarea al arreglo de tareas
    tasks.push(task);
    
    // Actualizar la UI
    renderTasks();
}

// Función para eliminar una tarea por ID
function deleteTask(taskId) {
    // Filtrar las tareas para eliminar la que corresponde al ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Actualizar la UI
    renderTasks();
}

// Función para marcar como completada o no completada
function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    
    // Actualizar la UI
    renderTasks();
}

// Función para editar una tarea
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const newText = prompt('Edita la tarea:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
        }
    }
    
    // Actualizar la UI
    renderTasks();
}

// Función para renderizar las tareas en la lista
function renderTasks() {
    // Limpiar la lista actual
    taskList.innerHTML = '';

    // Recorrer todas las tareas y crear un <li> por cada una
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) {
            li.classList.add('completed');
        }

        // Crear el HTML de la tarea
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id})">✅</button>
                <button onclick="editTask(${task.id})">✏️</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;

        // Agregar la tarea a la lista
        taskList.appendChild(li);
    });
}

// Manejar el envío del formulario
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
    }
    taskInput.value = '';  // Limpiar el campo de entrada
});
