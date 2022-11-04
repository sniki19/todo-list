export const generateElement = (tagName, options = {}) => {
	let element = document.createElement(tagName)

	let customProperties = [
		'innerHTML',
		'className',
		'class',
		'classList',
		'checked'
	]
	for (const prop in options) {
		if (!options[prop]) {
			continue
		}

		if (!customProperties.includes(prop)) {
			element.setAttribute(prop, options[prop])
		} else {
			switch(prop) {
				case 'innerHTML':
				case 'checked':
				case 'classList':
				case 'className':
					element[prop] = options[prop]
					break
				default:
					break
			}
		}
	}
	return element
}

export const generateTextbox = (className = '', value = '', placeholder = '') => {
	return generateElement('input', {
		type: 'text',
		value,
		className,
		placeholder
	})
}

export const generateButton = (className = '', value = '') => {
	return generateElement('input', {
		type: 'button',
		value: value,
		className: className
	})
}

export const generateCheckbox = (className = '', checked = false) => {
	return generateElement('input', {
		type: 'checkbox',
		checked,
		className
	})
}

export const generateCard = props => {
	const { id, checked, text, date } = props

	const card = generateElement('div', {
		id,
		className: 'card-todo',
	})

	const checkbox = generateCheckbox('completed-box', checked)
	const textbox = generateTextbox('text', text)
	textbox.readOnly = true
	const closeBtn = generateButton('btn close-todo-btn', 'x')
	const dateLabel = generateElement('div', {
		className: 'create-date',
		innerHTML: date
	})

	card.append(checkbox, textbox, closeBtn, dateLabel)

	return card
}
