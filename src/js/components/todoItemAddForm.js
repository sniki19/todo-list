import { uid } from '../utils/tools'
import { createButtonComponent, createContainerComponent, createTextboxComponent } from './shared'

const render = props => {
	const { id = uid(), className, onAdd } = props

	const enterNewTextInput = createTextboxComponent({
		className: 'new-value-text-input',
		placeholder: 'Enter todo...'
	})

	const addNewItemBtn = createButtonComponent({
		className: 'btn add-btn',
		value: 'Add',
		onClick: (e) => {
			e.preventDefault()
			const text = enterNewTextInput.value
			enterNewTextInput.value = null
			onAdd(e, text)
		}
	})

	const form = createContainerComponent({
		tagName: 'form',
		id,
		className,
		children: [enterNewTextInput, addNewItemBtn]
	})
	return form
}

export const todoItemAddFormComponent = (props = {}) => {
	const form = render(props)

	return form
}