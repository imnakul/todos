const form = document.getElementById('todoform')
const list = document.getElementById('todoList')
const textInput = document.getElementById('todoInput')
const dueInput = document.getElementById('dueDateInput')
const tagsInput = document.getElementById('tagInput')

// ?? Todos List
let todos = JSON.parse(localStorage.getItem('todos')) || []

todos.forEach(renderTodo)

form.addEventListener('submit', function (e) {
   e.preventDefault()

   const task = {
      id: Date.now(),
      text: textInput.value.trim(),
      dueDate: dueInput.value || null,
      tags: tagsInput.value || null,
      completed: false,
   }

   todos.push(task)
   localStorage.setItem('todos', JSON.stringify(todos))
   renderTodo(task)
   console.log(task)
   console.log(todos)

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
   checkbox.checked = task.completed
   checkbox.onchange = () => toggleCompleted(task.id)

   const content = document.createElement('span')
   content.textContent = task.text

   const due = document.createElement('span')
   due.textContent = task.dueDate

   const tag = document.createElement('span')
   tag.textContent = task.tags

   li.append(checkbox, content, due, tag)
   li.style.display = 'flex'
   li.style.flexDirection = 'column'
   li.style.marginBottom = '1rem'

   list.appendChild(li)
}

function toggleCompleted(id) {
   todos = todos.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
   localStorage.setItem('todos', JSON.stringify(todos))
   refreshUI()
}

function refreshUI() {
   list.innerHTML = ''
   todos.forEach(renderTodo)
}
