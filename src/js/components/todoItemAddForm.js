import { createButtonComponent, createContainerComponent, createTextboxComponent } from './shared'

export const todoItemAddFormComponent = onAddClick => {
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
			onAddClick(text)
		}
	})

	const form = createContainerComponent({
		tagName: 'form',
		id: 'addNewTodoCardForm',
		classNam: 'add-form',
		children: [enterNewTextInput, addNewItemBtn]
	})

	return form
}