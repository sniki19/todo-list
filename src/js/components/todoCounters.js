import { generateElement } from '../utils/renderTemplates'
import { uid } from '../utils/tools'
import { createContainerComponent } from './shared'

const allCounterText = 'All:'
const completedCounterText = 'Completed:'
const getCounterContent = (text, value) => text ? `${text} ${value}` : value

const render = () => {
	const allCounter = generateElement('div', {
		className: 'counter',
		innerHTML: getCounterContent(allCounterText, 0)
	})

	const completedCounter = generateElement('div', {
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

export const createTodoCountersComponent = () => {
	const [container, allCounter, completedCounter] = render()

	const update = (allValue, completedValue) => {
		allCounter.innerHTML = getCounterContent(allCounterText, allValue)
		completedCounter.innerHTML = getCounterContent(completedCounterText, completedValue)
	}

	return [
		container,
		update
	]
}