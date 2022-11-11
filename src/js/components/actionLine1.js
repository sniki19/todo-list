import { generateTodoData } from '../modules/todo'
import { getApi } from '../services/dataApi'
import { createContainerComponent } from './shared'
import { todoItemAddFormComponent } from './todoItemAddForm'
import { createDeleteTodoFormComponent } from './todoItemDeleteForm'

const render = (props) => {
	const { dataApi, updateCounters, deleteCards, createCard } = props

	const deleteFrom = createDeleteTodoFormComponent({
		onClick: (deleteCase) => {
			let deleteIds = []

			switch (deleteCase) {
				case 'all':
					deleteIds = dataApi.getAll().map(item => item.id)
					break
				case 'last':
					deleteIds = [dataApi.getAll()[dataApi.length - 1].id]
					break
				default:
					break
			}

			deleteIds.forEach(id => {
				if (dataApi.remove(id)) {
					deleteCards(id)
				}
			})
			updateCounters()
		}
	})

	const todoAddForm = todoItemAddFormComponent({
		className: 'add-form',
		onAdd: (e, text) => {
			const data = generateTodoData(text)
			dataApi.add(data)
			createCard(data)
			updateCounters()
		}
	})

	const actionLine1 = createContainerComponent({
		id: 'actionLine1',
		className: 'action-line',
		children: [deleteFrom, todoAddForm]
	})

	return actionLine1
}

export const createActionLine1Component = (props) => {
	const dataApi = getApi()
	return render({dataApi, ...props})
}
