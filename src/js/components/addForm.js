import { createButtonComponent, createContainerComponent, createTextboxComponent } from './shared'

export const createAddFormComponent = onAddHandler => {
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
			onAddHandler(text)
		}
	})

	const form = createContainerComponent({
		tagName: 'form',
		className: 'add-form',
		children: [enterNewTextInput, addNewItemBtn]
	})
	return form
}