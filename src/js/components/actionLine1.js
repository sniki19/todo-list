import { generateNewTodoData, store } from '../services/dataApi'
import { createContainerComponent } from './shared'
import { todoItemAddFormComponent } from './todoItemAddForm'
import { createDeleteTodoFormComponent } from './todoItemDeleteForm'

const renderContainer = () => {
	const actionLine1 = createContainerComponent({
		id: 'actionLine1',
		className: 'action-line'
	})

	return actionLine1
}

// const render = (props) => {
// 	const { dataApi, updateCounters, deleteCards, createCard, deleteAllCards} = props

// 	const deleteFrom = createDeleteTodoFormComponent({
// 		onClick: (deleteCase) => {
// 			if (deleteCase === 'all') {
// 				if (dataApi.clean()) {
// 					deleteAllCards()
// 					updateCounters()
// 				}
// 			}

// 			if (deleteCase === 'last') {
// 				const id = dataApi.getAll()[dataApi.length - 1]?.id

// 				if (id && dataApi.remove(id)) {
// 					deleteCards(id)
// 					updateCounters()
// 				}
// 			}
// 		}
// 	})

// 	const todoAddForm = todoItemAddFormComponent({
// 		className: 'add-form',
// 		onAdd: (e, text) => {
// 			const data = generateTodoData(text)
// 			dataApi.add(data)
// 			createCard(data)
// 			updateCounters()
// 		}
// 	})
// }

export const createActionLine1Component = (container) => {
	const actionLine = renderContainer()

	const deleteForm = createDeleteTodoFormComponent({
		onClick: (deleteCase) => {
			if (deleteCase === 'all') {
				if (store.clean()) {
					container.deleteAllCards()
					// updateCounters()
				}
			}

			if (deleteCase === 'last') {
				const ids = store.getAll().map(item => item.id)
				const lastId = ids[ids.length - 1]

				if (lastId && store.delete(lastId)) {
					container.deleteCard(lastId)
					// updateCounters()
				}
			}
		}
	})

	const todoAddForm = todoItemAddFormComponent(text => {
		const data = generateNewTodoData(text)
		store.add(data)
		container.addCard(data.id)
		// updateCounters()
	})


	// const dataApi = getApi()
	// return render({dataApi, ...props})

	actionLine.append(deleteForm, todoAddForm)

	return {
		element: actionLine,

	}
}
