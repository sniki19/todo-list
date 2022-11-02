import { Counter } from './modules/counter'
import {
	generateButton,
	generateElement,
	generateTextbox,
	generateTodoCard
} from './modules/render-templates'

const localStorageDataKey = 'TODO-LIST'
const root = document.getElementById('root')

let database = []

/* Header section */

const header = generateElement('div', {
	id: 'header',
	className: 'header'
})

const deleteAllBtn = generateButton('btn delete-all-btn', 'Delete All')
const deleteLastBtn = generateButton('btn delete-last-btn', 'Delete Last')
const enterNewTodoTextInput = generateTextbox('new-value-text-input', 'Enter todo...')
const addNewTodoBtn = generateButton('btn add-btn', 'Add')

header.append(deleteAllBtn, deleteLastBtn, enterNewTodoTextInput, addNewTodoBtn)

/* Action line: Counters, Filters, Search */

const actionLine = generateElement('div', {
	id: 'actionLine',
	className: 'action-line'
})

const showAllBtn = generateButton('btn show-all-btn', 'Show All')
const showCompletedBtn = generateButton('btn show-completed-btn', 'Show Completed')
const searchTextInput = generateTextbox('search-input', 'Search...')

const allCounter = new Counter('div', 'All: ')
const completedCounter = new Counter('div', 'Completed: ')

actionLine.append(
	allCounter.render(),
	completedCounter.render(),
	showAllBtn,
	showCompletedBtn,
	searchTextInput
)

/* Content Area */

const todoContainer = generateElement('div', {
	className: 'container-todos'
})


/* Main */

root.append(header, actionLine, todoContainer)

function deleteAllTodosHandler() {
	todoContainer.innerHTML = null
	database = []
}

function deleteLastTodoHandler() {
	if (!todoContainer.hasChildNodes()) {
		alert('Todo not exists')
		return
	}

	let lastChild = todoContainer.lastChild
	database = database.filter(todo => todo.id !== +lastChild.id)
	lastChild.remove()
}

const updateCountersHandler = () => {
	const allTodos = database.length
	const completedTodos = database.filter(todo => todo.checked).length

	allCounter.updateValue(allTodos)
	completedCounter.updateValue(completedTodos)
}

function containerHandler(event) {
	const target = event.target
	const todoCard = target.parentElement
	const id = +todoCard.id

	if (target.classList.contains('completed-box')) {
		if (target.checked) {
			todoCard.classList.add('completed')
		} else {
			todoCard.classList.remove('completed')
		}

		const todoData = database.find(todo => todo.id === id)
		todoData.checked = target.checked
	}

	if (target.classList.contains('close-todo-btn')) {
		database = database.filter(todo => todo.id !== id)
		todoCard.remove()
	}
}

function addNewTodoHandler() {
	const data = {
		id: Date.now(),
		checked: false,
		text: enterNewTodoTextInput.value,
		date: new Date().toLocaleDateString()
	}
	const card = generateTodoCard(data)

	enterNewTodoTextInput.value = null
	database.push(data)
	todoContainer.appendChild(card)
}

function showAllTodosHandler() {
	searchTextInput.value = null
	clearTodoContainer()
	renderTodos(database)
}

function showCompletedTodosHandler() {
	searchTextInput.value = null
	clearTodoContainer()
	renderTodos(database.filter(todo => todo.checked))
}

function showTodosWithSearchValueHandler(e) {
	clearTodoContainer()
	const searchStr = e.target.value
	renderTodos(database.filter(todo => todo.text.includes(searchStr)))
}

function clearTodoContainer() {
	todoContainer.innerHTML = null
}

const renderTodos = data => {
	data.forEach(todo => {
		const card = generateTodoCard(todo)
		todoContainer.appendChild(card)
	})
	updateCountersHandler()
}

const loadDataFromLocalStorage = () => {
	const storageData = localStorage.getItem(localStorageDataKey)
	database = JSON.parse(storageData)

	if (!database) {
		database = []
	}

	renderTodos(database)
}

const saveDataInLocalStorage = () => {
	localStorage.setItem(localStorageDataKey, JSON.stringify(database))
}


deleteAllBtn.addEventListener('click', deleteAllTodosHandler)
deleteAllBtn.addEventListener('click', updateCountersHandler)

deleteLastBtn.addEventListener('click', deleteLastTodoHandler)
deleteLastBtn.addEventListener('click', updateCountersHandler)

addNewTodoBtn.addEventListener('click', addNewTodoHandler)
addNewTodoBtn.addEventListener('click', updateCountersHandler)

showAllBtn.addEventListener('click', showAllTodosHandler)
showCompletedBtn.addEventListener('click', showCompletedTodosHandler)
searchTextInput.addEventListener('keyup', showTodosWithSearchValueHandler)

todoContainer.addEventListener('click', containerHandler)
todoContainer.addEventListener('click', updateCountersHandler)

window.addEventListener('load', loadDataFromLocalStorage)
window.addEventListener('load', updateCountersHandler)

window.addEventListener('beforeunload', saveDataInLocalStorage)
