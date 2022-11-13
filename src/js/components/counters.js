import { store } from '../services/dataApi'
import { renderElement } from '../utils'
import { createContainerComponent } from './shared'

const allCounterText = 'All:'
const completedCounterText = 'Completed:'
const getCounterContent = (text, value) => text ? `${text} ${value}` : value

let allCounter = null
let completedCounter = null

export const updateValues = () => {
	const allValue = store.getAll().length
	const completedValue = store.getFiltered(todo => todo.checked).length

	if (allCounter) {
		allCounter.innerHTML = getCounterContent(allCounterText, allValue)
	}
	if (completedCounter) {
		completedCounter.innerHTML = getCounterContent(completedCounterText, completedValue)
	}
}

export const createCounterComponent = () => {
	allCounter = renderElement('div', {
		className: 'counter',
		innerHTML: getCounterContent(allCounterText, 0)
	})

	completedCounter = renderElement('div', {
		className: 'counter',
		innerHTML: getCounterContent(completedCounterText, 0)
	})

	const container = createContainerComponent({
		className: 'counter-list',
		children: [allCounter, completedCounter]
	})

	updateValues()

	return {
		element: container,
		updateValues
	}
}

