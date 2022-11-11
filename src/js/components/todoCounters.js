import { getApi } from '../services/dataApi'
import { generateElement } from '../utils/renderTemplates'
import { uid } from '../utils/tools'
import { createContainerComponent } from './shared'

const allCounterText = 'All:'
const completedCounterText = 'Completed:'
const getCounterContent = (text, value) => text ? `${text} ${value}` : value

let allCounter = null
let completedCounter = null

const render = () => {
	allCounter = generateElement('div', {
		className: 'counter',
		innerHTML: getCounterContent(allCounterText, 0)
	})

	completedCounter = generateElement('div', {
		className: 'counter',
		innerHTML: getCounterContent(completedCounterText, 0)
	})

	const container = createContainerComponent({
		id: uid(),
		className: 'counter-list',
		children: [allCounter, completedCounter]
	})
	return [container, allCounter, completedCounter]
}

export const updateCounters = () => {
	const dataApi = getApi()

	const allValue = dataApi.getAll().length
	const completedValue = dataApi.getFiltered(todo => todo.checked).length

	if (allCounter) {
		allCounter.innerHTML = getCounterContent(allCounterText, allValue)
	}
	if (completedCounter) {
		completedCounter.innerHTML = getCounterContent(completedCounterText, completedValue)
	}
}

export const createTodoCountersComponent = () => {
	const counterContainer= render()

	updateCounters()

	return counterContainer
}