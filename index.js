const form = document.getElementById('todoform')
const list = document.getElementById('todoList')
const textInput = document.getElementById('todoInput')
const dueInput = document.getElementById('dueDateInput')
const tagsInput = document.getElementById('tagInput')
const submitBtn = document.getElementById('addTodoButton')

// ?? Todos List
let todos = JSON.parse(localStorage.getItem('todos')) || []

let editId = null

todos.forEach(renderTodo)

form.addEventListener('submit', function (e) {
   e.preventDefault()

   const newTask = {
      text: textInput.value.trim(),
      dueDate: dueInput.value || null,
      tags: tagsInput.value || null,
      completed: false,
   }

   if (editId !== null) {
      todos = todos.map((task) => (task.id === editId ? { ...task, ...newTask } : task))
      editId = null
      submitBtn.textContent = 'Add'
   } else {
      newTask.id = Date.now()
      todos.push(newTask)
   }

   // todos.push(newTask)
   localStorage.setItem('todos', JSON.stringify(todos))
   renderTodo(newTask)
   refreshUI()
   // console.log(task)
   // console.log(todos)

   //?? Clear form
   textInput.value = ''
   dueInput.value = ''
   tagsInput.value = ''
})

function renderTodo(task) {
   const li = document.createElement('li')
   li.setAttribute('data-id', task.id)

   const checkbox = document.createElement('input')
   checkbox.type = 'checkbox'
   checkbox.classList.add('todoCheckbox')
   checkbox.checked = task.completed
   checkbox.onchange = () => toggleCompleted(task.id)

   const content = document.createElement('span')
   content.classList.add('todoText')
   content.textContent = task.text

   if (task.completed) content.style.textDecoration = 'line-through'

   const due = document.createElement('span')
   due.classList.add('dueDate')
   due.textContent = task.dueDate

   const tag = document.createElement('span')
   tag.classList.add('tag')
   tag.textContent = task.tags

   const deleteButton = document.createElement('button')
   deleteButton.textContent = '❌'
   deleteButton.onclick = () => deleteTodo(task.id)

   const editButton = document.createElement('button')
   editButton.textContent = '✏️'
   editButton.onclick = () => editTodo(task.id)

   li.append(checkbox, content, due, tag, deleteButton, editButton)
   li.classList.add('todoItem')
   // li.style.display = 'flex'
   // li.style.flexDirection = 'column'
   li.style.marginBottom = '1rem'

   list.appendChild(li)
}

function toggleCompleted(id) {
   todos = todos.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
   localStorage.setItem('todos', JSON.stringify(todos))
   refreshUI()
}

function deleteTodo(id) {
   let perm = confirm('Are you sure you want to delete the task')
   if (perm) {
      todos = todos.filter((task) => task.id !== id)
      localStorage.setItem('todos', JSON.stringify(todos))
      refreshUI()
   }
}

function editTodo(id) {
   const task = todos.find((t) => t.id === id)
   if (!task) return

   textInput.value = task.text
   dueInput.value = task.dueDate || ''
   tagsInput.value = task.tags
   submitBtn.textContent = 'Update'
   editId = id
}

function refreshUI() {
   list.innerHTML = ''
   todos.forEach(renderTodo)
}
