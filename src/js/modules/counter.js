import { generateElement } from '../utils/renderTemplates'

const getCounterContent = (text, value) => text ? `${text} ${value}` : value

export function Counter(tagName = 'div', text = '', defaultValue = 0, className = 'counter') {
	let currentValue = defaultValue
	const element = generateElement(tagName, {
		className: className,
		innerHTML: getCounterContent(text, currentValue)
	})

	Object.defineProperty(this, 'value', {
		'get': () => currentValue
	})

	this.updateValue = value => {
		if (value !== currentValue) {
			currentValue = value
			element.innerHTML = getCounterContent(text, currentValue)
		}
	}
	this.increaseValue = (number = 1) => {
		currentValue += number
		element.innerHTML = getCounterContent(text, currentValue)
	}
	this.render = () => element
}
