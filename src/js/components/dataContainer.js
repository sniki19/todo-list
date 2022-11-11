import { store } from '../services/dataApi'
import { createContainerComponent } from './shared'
import { createTodoItemComponent } from './todoItem'

const renderContainer = () => {
	const container = createContainerComponent({
		id: 'todoDataContainer',
		className: 'todo-data-container'
	})

	return container

	// const { dataApi, updateCounters } = props

	// return todoItemListContainerComponent({
	// 	id: uid(),
	// 	className: 'container-todos',
	// 	data: dataApi.getAll(),
	// 	onDeleteClick: (id) => {
	// 		const result = dataApi.remove(id)
	// 		updateCounters()
	// 		console.log('onDeleteClick: ', JSON.stringify(dataApi.getAll()))
	// 		return result
	// 	},
	// 	onCompleteClick: (id) => {
	// 		const result = dataApi.update({
	// 			id: id,
	// 			checked: true
	// 		})
	// 		if (result) {
	// 			updateCounters()
	// 		}
	// 		return result
	// 	}
	// })
}

// export const clear = (container) => {

// }

function loadData(dataList) {
	const container = this.element

	dataList.forEach(data => {
		const item = createTodoItemComponent(data)
		container.append(item)
	})
}

function deleteAllCards() {
	const container = this.element

	container.innerHTML = null
}

function deleteCard(id) {
	const container = this.element
	const card = container.querySelector(`#${id}`)
	card.remove()
}

function addCard(id) {
	const container = this.element
	const data = store.getById(id)

	const item = createTodoItemComponent(data)
	container.append(item)
}

export const createDataContainerComponent = () => {
	return {
		element: renderContainer(),
		loadData,
		deleteAllCards,
		deleteCard,
		addCard
	}

	// const [todoListContainer, createCard, deleteCard, setFilterForCards, clean] = render({ dataApi, ...props })

	// if (dataApi.getAll().length) {
	// 	dataApi.getAll().forEach(data => {
	// 		createCard(data)
	// 	})
	// }

	// return [todoListContainer, createCard, deleteCard, setFilterForCards, clean]
	return container
}
