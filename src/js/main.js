import { createActionLine1Component } from './components/actionLine1'
import { createActionLine2Component } from './components/actionLine2'
import { createDataContainerComponent } from './components/dataContainer'

const [todoListContainer, createCard, deleteCards, setFilterForCards] = createDataContainerComponent({
	updateCounters: updateCountersValue
})

const [actionLine2, updateCounters] = createActionLine2Component({
	setFilterForCards
})

const actionLine1 = createActionLine1Component({
	updateCounters,
	deleteCards,
	createCard
})

function updateCountersValue() {
	updateCounters()
}

root.append(actionLine1, actionLine2, todoListContainer)

// const dataApi = getApi()

// const [todoListContainer, createNewCard, deleteCards, setFilterForCards] = todoItemListContainerComponent({
// 	id: uid(),
// 	className: 'container-todos',
// 	data: dataApi.getAll(),
// 	onDeleteClick: (id) => {
// 		const result = dataApi.remove(id)
// 		if (result) {
// 			setNewCountersValue()
// 		}
// 		return result
// 	},
// 	onCompleteClick: (id) => {
// 		const result = dataApi.update({
// 			id: id,
// 			checked: true
// 		})
// 		if (result) {
// 			setNewCountersValue()
// 		}
// 		return result
// 	}
// })

// const deleteFrom = createDeleteTodoFormComponent({
// 	onClick: (deleteCase) => {
// 		let deleteIds = []

// 		switch (deleteCase) {
// 			case 'all':
// 				deleteIds = dataApi.getAll().map(item => item.id)
// 				break
// 			case 'last':
// 				deleteIds = [dataApi.getAll()[dataApi.length - 1].id]
// 				break
// 			default:
// 				break
// 		}

// 		deleteIds.forEach(id => {
// 			if (dataApi.remove(id)) {
// 				deleteCards(id)
// 			}
// 		})
// 		setNewCountersValue()
// 	}
// })

// const todoAddForm = todoItemAddFormComponent({
// 	className: 'add-form',
// 	onAdd: (e, text) => {
// 		const data = generateTodoData(text)
// 		dataApi.add(data)
// 		createNewCard(data)
// 		setNewCountersValue()
// 	}
// })

// const [counterForm, updateCounters] = createTodoCountersComponent()

// const setNewCountersValue = () => {
// 	const allTodos = dataApi.length
// 	const completedTodos = dataApi.getFiltered(todo => todo.checked).length

// 	updateCounters(allTodos, completedTodos)
// }

// const filters = createTodoFiltersComponent({
// 	onChange: (filter) => {
// 		const cardsIds = dataApi.getFiltered(filter).map(item => item.id)
// 		setFilterForCards(cardsIds)
// 	}
// })

// const actionLine1 = createContainerComponent({
// 	id: 'actionLine1',
// 	className: 'action-line',
// 	children: [deleteFrom, todoAddForm]
// })

// const actionLine2 = createContainerComponent({
// 	id: 'actionLine',
// 	className: 'action-line',
// 	children: [counterForm, filters]
// })

// root.append(actionLine1, actionLine2, todoListContainer)
