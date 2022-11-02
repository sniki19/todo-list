function generateElement(tagName, options = {}) {
	let element = document.createElement(tagName)

	let customProperties = [
		'innerHTML',
		'className',
		'class',
		'classList',
		'checked'
	]
	for (const prop in options) {
		if (!prop) {
			console.warn(`Warning!!! prop: ${prop}`)
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

function generateTextbox(className = '', placeholder = '', value = '') {
	return generateElement('input', {
		type: 'text',
		value,
		className,
		placeholder
	})
}

function generateButton(className = '', value = '') {
	return generateElement('input', {
		type: 'button',
		value: value,
		className: className
	})
}

function generateCheckbox(className = '', checked = false) {
	return generateElement('input', {
		type: 'checkbox',
		checked,
		className
	})
}


function generateTextCounter(tagName, value = 0) {
	return generateElement(tagName, {
		className: 'counter',
		innerHTML: value
	})
}

function generateTodoCard(data) {
	const card = generateElement('div', {
		id: data.id,
		className: 'card-todo',
	})

	const checkbox = generateCheckbox('completed-box', data.checked)
	const textbox = generateTextbox('text', '', data.text)
	const closeBtn = generateButton('btn close-todo-btn', 'x')
	const dateLabel = generateElement('div', {
		className: 'create-date',
		innerHTML: data.date
	})

	card.append(checkbox, textbox, closeBtn, dateLabel)

	return card
}

export {
	generateElement,
	generateTextbox,
	generateButton,
	generateTextCounter,
	generateTodoCard
}

