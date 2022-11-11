import { uid } from '../utils/tools'

export const generateTodoData = text => ({
	id: uid(),
	checked: false,
	text: text,
	date: new Date().toLocaleDateString()
})
