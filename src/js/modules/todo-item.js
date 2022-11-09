import { generateCard } from '../utils/render-templates'
import { uid } from '../utils/tools'

export const generateTodoData = text => ({
	id: uid(),
	checked: false,
	text: text,
	date: new Date().toLocaleDateString()
})

export function TodoItem(sourceData) {
	let data = {...sourceData}
	const element = generateCard(data)

	return {
		get id() {
			return data.id
		},
		get checkState() {
			return data.checked
		},
		setState: isCompleted => data.checked = isCompleted,
		get data() {
			return {...data}
		},
		update: updateData => data = { ...data, ...updateData },

		get card() {
			return element
		},
		render: () => element,
		removeElement: () => element.remove()
	}
}

export function todoCardComlete(todoCard, complateState) {
	if (complateState) {
		todoCard.classList.add('completed')
	} else {
		todoCard.classList.remove('completed')
	}
}

export function todoCardHide(todoCard, hideState) {
	if (hideState) {
		todoCard.classList.add('hidden')
	} else {
		todoCard.classList.remove('hidden')
	}
}
