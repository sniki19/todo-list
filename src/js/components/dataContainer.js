import { generateNewTodoData, store } from '../services/dataApi'
import { createContainerComponent } from './shared'
import { createTodoItemComponent } from './todoItem'

const renderContainer = () => {
	const container = createContainerComponent({
		id: 'todoDataContainer',
		className: 'todo-data-container'
	})

	return container
}

function loadTodos(todoDataList) {
	todoDataList.forEach(data => {
		const item = createTodoItemComponent(data)
		this.append(item)
	})
}

function deleteAllTodos() {
	store.clean()
	this.innerHTML = null
}

function deleteTodo(id) {
	const data = store.getById(id)
	if (data) {
		store.delete(id)
		const card = this.querySelector(`#${id}`)
		card.remove()
	}
}

function completeTodo(id) {
	store.update({
		id,
		checked: true
	})

	const card = this.querySelector(`#${id}`)
	card.classList.add('completed')
	const checkbox = card.querySelector('.checked-box')
	checkbox.disabled = true
}

function addTodo(text) {
	const data = generateNewTodoData(text)
	store.add(data)

	const item = createTodoItemComponent(data)
	this.append(item)
}

function displayFilter(filter) {
	const showIds = store.getFiltered(filter).map(card => card.id)
	const cards = this.querySelectorAll('.card-todo')
	cards.forEach(card => {
		if (showIds.includes(card.id)) {
			card.classList.remove('hidden')
		} else {
			card.classList.add('hidden')
		}
	})
}

export const createDataContainerComponent = (updateCounters) => {
	const element = renderContainer()

	element.addEventListener('click', (e) => {
		const target = e.target
		const todo = target.closest('.card-todo')
		const id = todo?.id

		if (id && target.classList.contains('checked-box')) {
			completeTodo.call(element, id)
			updateCounters()
		}

		if (id && target.classList.contains('close-todo-btn')) {
			deleteTodo.call(element, id)
			updateCounters()
		}
	})

	return {
		element,
		loadData: loadTodos.bind(element),
		deleteAllCards: () => {
			deleteAllTodos.call(element)
			updateCounters()
		},
		deleteCard: (...args) => {
			deleteTodo.call(element, ...args)
			updateCounters()
		},
		addCard: (...args) => {
			addTodo.call(element, ...args)
			updateCounters()
		},
		displayFilter: displayFilter.bind(element)
	}
}
