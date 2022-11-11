import { generateElement } from '../utils/renderTemplates'
import {
	createButtonComponent,
	createCheckboxComponent, createContainerComponent, createTextboxComponent
} from './shared'

const render = props => {
	const { id, checked, text, date } = props

	const card = createContainerComponent({
		id,
		className: 'card-todo'
	})

	const checkbox = createCheckboxComponent({
		className: 'checked-box',
		checked
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

	const dateLabel = generateElement('div', {
		className: 'create-date',
		innerHTML: date
	})

	card.append(checkbox, textbox, closeBtn, dateLabel)

	return card
}

export const createTodoItemComponent = (props) => {
	return render(props)
}