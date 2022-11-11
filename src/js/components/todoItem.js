import { store } from '../services/dataApi'
import { generateElement } from '../utils/renderTemplates'
import {
	createButtonComponent,
	createCheckboxComponent,
	createContainerComponent,
	createTextboxComponent
} from './shared'

export const createTodoItemComponent = props => {
	const { id, checked, text, date } = props

	const card = createContainerComponent({
		id,
		className: checked ? 'card-todo completed' : 'card-todo'
	})

	const checkbox = createCheckboxComponent({
		className: 'checked-box',
		checked,
		disabled: checked,
		onChange: () => {
			store.update({
				id,
				checked: true
			})

			checkbox.disabled = true
			card.classList.add('completed')
		}
	})

	const textbox = createTextboxComponent({
		className: 'text',
		value: text,
		readOnly: true
	})

	const closeBtn = createButtonComponent({
		className: 'btn close-todo-btn',
		value: 'x',
		onClick: () => {
			store.delete(id)
			card.remove()
		}
	})

	const dateLabel = generateElement('div', {
		className: 'create-date',
		innerHTML: date
	})

	card.append(checkbox, textbox, closeBtn, dateLabel)

	return card
}