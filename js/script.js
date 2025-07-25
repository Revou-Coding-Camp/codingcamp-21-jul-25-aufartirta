// DOM elements
const todoInput    = document.getElementById('todo-input');
const todoDate     = document.getElementById('todo-date');
const filterSelect = document.getElementById('todo-filter');
const deleteAllBtn = document.getElementById('todo-delete');
const todoList     = document.getElementById('todo-list');
const addBtn       = document.getElementById('todo-addBtn');

// Strore tasks
let tasks = [];

// Add button event listener
addBtn.addEventListener('click', addTodo);

// 3) Add task (called by onclick="addTodo()")
function addTodo() {
  const text = todoInput.value.trim();
  const date = todoDate.value;

  if (!text || !date) {
    alert('Please enter both a task and a due date.');
    return;
  }

  tasks.push({ text, date, completed: false });

  // reset form
  todoInput.value = '';
  todoDate.value  = '';

  renderTasks();
}

// Render tasks in display
function renderTasks() {
  todoList.innerHTML = '';

  if (tasks.length === 0) {
    todoList.innerHTML = `
      <tr class="todo-empty">
        <td colspan="4">No task found</td>
      </tr>`;
    return;
  }

  const filter = filterSelect.value; 

  tasks.forEach((task, index) => {
   
    if (filter === 'completed'   && !task.completed) return;
    if (filter === 'uncompleted' &&  task.completed) return;

    const tr = document.createElement('tr');
    tr.dataset.index = index;

    
    var completeIcon = task.completed ? '❌' : '✅';
    
    var deleteIcon   = '🗑️';

     tr.innerHTML =
      '<td class="' + (task.completed ? 'completed' : '') + '">' +
        task.text +
      '</td>' +
      '<td>' + task.date + '</td>' +
      '<td>' + (task.completed ? 'Completed' : 'Uncompleted') + '</td>' +
      '<td>' +
        '<button class="action-btn complete-btn">' + completeIcon + '</button>' +
        '<button class="action-btn delete-btn">'   + deleteIcon   + '</button>' +
      '</td>';
    todoList.appendChild(tr);
  });
}

// Remove task / Change task status
function removeTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

function toggleTaskStatus(i) {
  tasks[i].completed = !tasks[i].completed;
  renderTasks();
}

// Delegate clicks on ✔ and ✖
todoList.addEventListener('click', e => {
  const btn = e.target;
  const tr  = btn.closest('tr');
  if (!tr || tr.classList.contains('todo-empty')) return;

  const i = Number(tr.dataset.index);
  if (btn.classList.contains('delete-btn')) {
    removeTask(i);
  } else if (btn.classList.contains('complete-btn')) {
    toggleTaskStatus(i);
  }
});

// Delete all
function clearAllTasks() {
  if (!confirm('Delete all tasks?')) return;
  tasks = [];
  renderTasks();
}

// 7) Bind filter & delete-all handlers
filterSelect.addEventListener('change', renderTasks);
deleteAllBtn.addEventListener('click', clearAllTasks);

renderTasks();
