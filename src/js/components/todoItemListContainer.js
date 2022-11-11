import { createContainerComponent } from './shared'
import { createTodoItemComponent } from './todoItem'

export const todoItemListContainerComponent = (props = {}) => {
	const { id, className = 'container', onDeleteClick, onCompleteClick } = props

	const container = createContainerComponent({ id, className })

	container.addEventListener('click', (e) => {
		const target = e.target
		const card = target.parentElement
		const cardId = card.id

		if (target.classList.contains('checked-box')) {
			if (onCompleteClick(cardId)) {
				target.disabled = true
				card.classList.add('completed')
			}
		}

		if (target.classList.contains('close-todo-btn')) {
			if (onDeleteClick(cardId)) {
				card.remove()
			}
		}
	})

	const filterCards = cardIds => {
		const cards = container.querySelectorAll('.card-todo')
		cards.forEach(card => {
			if (cardIds.includes(card.id)) {
				card.classList.remove('hidden')
			} else {
				card.classList.add('hidden')
			}
		})
	}

	const addNewTodoItem = data => {
		const element = createTodoItemComponent(data)
		container.append(element)
	}
	const deleteTodoItem = id => {
		let findElement = container.querySelector(`#${id}`)
		findElement.remove()
	}

	return [
		container,
		addNewTodoItem,
		deleteTodoItem,
		filterCards
	]
}