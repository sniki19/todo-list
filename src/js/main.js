import { Counter } from './modules/counter'
import { DataBase } from './modules/database'
import { generateButton, generateElement, generateTextbox } from './modules/render-templates'
import { generateTodoData, todoCardComlete, todoCardHide, TodoItem } from './modules/todo-item'

const db = new DataBase()
const localStorageDataKey = 'TODO-LIST'

const deleteAllBtn = generateButton('btn delete-all-btn', 'Delete All')
const deleteLastBtn = generateButton('btn delete-last-btn', 'Delete Last')
const enterNewTodoTextInput = generateTextbox('new-value-text-input', '', 'Enter todo...')
const addNewTodoBtn = generateButton('btn add-btn', 'Add')

const allCounter = new Counter('div', 'All: ')
const completedCounter = new Counter('div', 'Completed: ')
const showAllBtn = generateButton('btn show-all-btn', 'Show All')
const showCompletedBtn = generateButton('btn show-completed-btn', 'Show Completed')
const searchTextInput = generateTextbox('search-input', '', 'Search...')

const todoContainer = generateElement('div', {
	id: 'todoCardContainer',
	className: 'container-todos'
})

;(function init() {
	const header = generateElement('div', {
		id: 'header',
		className: 'header',
	})
	header.append(deleteAllBtn, deleteLastBtn, enterNewTodoTextInput, addNewTodoBtn)

	const actionLine = generateElement('div', {
		id: 'actionLine',
		className: 'action-line'
	})
	actionLine.append(allCounter.render(), completedCounter.render(), showAllBtn, showCompletedBtn, searchTextInput)

	root.append(header, actionLine, todoContainer)
})()


const renderNewTodoCard = data => {
	const todo = new TodoItem(data)
	db.push(todo)

	const todoCard = todo.render()
	todoCardComlete(todoCard, todo.checkState)

	todoContainer.appendChild(todoCard)
}

const handleDeleteAllTodoCards = () => {
	todoContainer.innerHTML = null
	db.clean()
}

const handleDeleteLastTodoCard = () => {
	const visibleCollection = todoContainer.querySelectorAll('.card-todo:not(.hidden)')
	if (!visibleCollection.length) {
		return
	}

	const lastChild = visibleCollection[visibleCollection.length - 1]
	if (db.remove(lastChild.id)) {
		lastChild.remove()
	}
}

const handleUpdateCounters = () => {
	const allTodos = db.length
	const completedTodos = db.getFiltered(todo => todo.checkState).length

	allCounter.updateValue(allTodos)
	completedCounter.updateValue(completedTodos)
}

const handleAddNewTodoCard = () => {
	const data = generateTodoData(enterNewTodoTextInput.value)
	enterNewTodoTextInput.value = null

	renderNewTodoCard(data)
}

const handleShowAllTodos = () => {
	searchTextInput.value = null
	db.getAll().forEach(todo => todoCardHide(todo.card, false))
}

const handleShowCompletedTodos = () => {
	searchTextInput.value = null
	db.getAll().forEach(todo => todoCardHide(todo.card, !todo.checkState))
}

const handleShowTodosWithSearchValue = (event) => {
	const searchStr = event.target.value
	db.getAll().forEach(todo => todoCardHide(todo.card, !todo.data.text.includes(searchStr)))
}

const handleTodoContainer = (event) => {
	const target = event.target
	const todoCard = target.parentElement
	const todoId = todoCard.id

	if (target.classList.contains('completed-box')) {
		db.put(todoId, {
			checked: target.checked
		})
		todoCardComlete(todoCard, target.checked)
	}

	if (target.classList.contains('close-todo-btn')) {
		db.remove(todoId)
		todoCard.remove()
	}
}

const loadDataFromLocalStorage = () => {
	const storageData = localStorage.getItem(localStorageDataKey)
	const todoList = JSON.parse(storageData)

	todoList.forEach(renderNewTodoCard)
}

const saveDataInLocalStorage = () => {
	let data = db.getAll().map(todo => todo.data)
	localStorage.setItem(localStorageDataKey, JSON.stringify(data))
}


deleteAllBtn.addEventListener('click', handleDeleteAllTodoCards)
deleteAllBtn.addEventListener('click', handleUpdateCounters)

deleteLastBtn.addEventListener('click', handleDeleteLastTodoCard)
deleteLastBtn.addEventListener('click', handleUpdateCounters)

addNewTodoBtn.addEventListener('click', handleAddNewTodoCard)
addNewTodoBtn.addEventListener('click', handleUpdateCounters)

showAllBtn.addEventListener('click', handleShowAllTodos)
showCompletedBtn.addEventListener('click', handleShowCompletedTodos)
searchTextInput.addEventListener('keyup', handleShowTodosWithSearchValue)

todoContainer.addEventListener('click', handleTodoContainer)
todoContainer.addEventListener('click', handleUpdateCounters)

window.addEventListener('load', loadDataFromLocalStorage)
window.addEventListener('load', handleUpdateCounters)

window.addEventListener('beforeunload', saveDataInLocalStorage)
