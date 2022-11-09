import createButtonComponent from './components/buttonComponent'
import { Counter } from './modules/counter'
import { generateTodoData, todoCardComlete, todoCardHide, TodoItem } from './modules/todo-item'
import initStore from './services/data-api'
import { generateButton, generateElement, generateTextbox } from './utils/render-templates'

const renderNewTodoCard = todo => {
	const todoCard = todo.render()
	todoCardComlete(todoCard, todo.checkState)

	todoContainer.appendChild(todoCard)
}

const handleDeleteAllTodoCards = () => {
	todoContainer.innerHTML = null
	dataStore.clean()
}

const handleDeleteLastTodoCard = () => {
	const visibleCollection = todoContainer.querySelectorAll('.card-todo:not(.hidden)')
	if (!visibleCollection.length) {
		return
	}

	const lastChild = visibleCollection[visibleCollection.length - 1]
	if (dataStore.remove(lastChild.id)) {
		lastChild.remove()
	}
}

const handleUpdateCounters = (e, store) => {
	const allTodos = dataStore.length
	const completedTodos = dataStore.getFiltered(todo => todo.checkState).length

	allCounter.updateValue(allTodos)
	completedCounter.updateValue(completedTodos)
}

const handleAddNewTodoCard = () => {
	const data = generateTodoData(enterNewTodoTextInput.value)
	enterNewTodoTextInput.value = null

	const todo = new TodoItem(data)
	dataStore.add(todo)
	renderNewTodoCard(todo)
}

const handleShowAllTodos = () => {
	searchTextInput.value = null
	dataStore.getAll().forEach(todo => todoCardHide(todo.card, false))
}

const handleShowCompletedTodos = () => {
	searchTextInput.value = null
	dataStore.getAll().forEach(todo => todoCardHide(todo.card, !todo.checkState))
}

const handleShowTodosWithSearchValue = (event) => {
	const searchStr = event.target.value
	dataStore.getAll().forEach(todo => todoCardHide(todo.card, !todo.data.text.includes(searchStr)))
}

const handleTodoContainer = (event) => {
	const target = event.target
	const todoCard = target.parentElement
	const todoId = todoCard.id

	if (target.classList.contains('completed-box')) {
		dataStore.update(todoId, {
			checked: target.checked
		})
		todoCardComlete(todoCard, target.checked)
	}

	if (target.classList.contains('close-todo-btn')) {
		dataStore.remove(todoId)
		todoCard.remove()
	}
}

const handleRenderAllTodoCards = (e, store) => {
	store.getAll().forEach(item => renderNewTodoCard(item))
}

const dataStore = initStore({
	onLoad: [handleRenderAllTodoCards, handleUpdateCounters],
	onSave: true,
	dataToInstanceMapper: data => new TodoItem(data),
	instanceToDataMapper: instance => instance.data
})

const deleteAllBtn = createButtonComponent({
	className: 'btn delete-all-btn',
	value: 'Delete All',
	onClick: [handleDeleteAllTodoCards, handleUpdateCounters]
})
const deleteLastBtn = createButtonComponent({
	className: 'btn delete-last-btn',
	value: 'Delete Last',
	onClick: [handleDeleteLastTodoCard, handleUpdateCounters]
})
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


addNewTodoBtn.addEventListener('click', handleAddNewTodoCard)
addNewTodoBtn.addEventListener('click', handleUpdateCounters)

showAllBtn.addEventListener('click', handleShowAllTodos)
showCompletedBtn.addEventListener('click', handleShowCompletedTodos)
searchTextInput.addEventListener('keyup', handleShowTodosWithSearchValue)

todoContainer.addEventListener('click', handleTodoContainer)
todoContainer.addEventListener('click', handleUpdateCounters)
