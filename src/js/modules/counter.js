import { generateElement } from './render-templates'

const getCounterContent = (text, value) => text ? `${text} ${value}` : value

export function Counter(tagName = 'div', text = '', defaultValue = 0, className = 'counter') {
	const counterId = `counter-${Date.now()}`
	let currentValue = defaultValue
	const element = generateElement(tagName, {
		className: className,
		innerHTML:  getCounterContent(text, currentValue)
	})

	return {
		id: counterId,
		get value() {
			return currentValue
		},
		updateValue: value => {
			if (value !== currentValue) {
				currentValue = value
				element.innerHTML = getCounterContent(text, currentValue)
			}
		},
		increaseValue: (number = 1) => {
			currentValue += number
			element.innerHTML = getCounterContent(text, currentValue)
		},
		render: () => element,
	}
}
