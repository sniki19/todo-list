import { renderElement } from '../utils'
import {
	createButtonComponent,
	createCheckboxComponent,
	createContainerComponent,
	createTextboxComponent
} from './shared'

export const createTodoItemComponent = (data) => {
	const { id, checked, text, date } = data

	const card = createContainerComponent({
		id,
		className: checked ? 'card-todo completed' : 'card-todo'
	})

	const checkbox = createCheckboxComponent({
		className: 'checked-box',
		checked,
		disabled: checked
	})

	const textbox = createTextboxComponent({
		className: 'text',
		value: text,
		readOnly: true
	})

	const closeBtn = createButtonComponent({
		className: 'btn close-todo-btn',
		value: 'x'
	})

	const dateLabel = renderElement('div', {
		className: 'create-date',
		innerHTML: date
	})

	card.append(checkbox, textbox, closeBtn, dateLabel)

	return card
}