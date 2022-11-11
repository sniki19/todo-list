import { uid } from '../utils/tools'
import { createStoreInstance } from './dataStore'

const localStorageDataKey = 'TODO-LIST'
const store = createStoreInstance('dataApiJs')

export const generateNewTodoData = text => ({
	id: uid(),
	checked: false,
	text: text,
	date: new Date().toLocaleDateString()
})

export const initStore = () => {
	const storageData = localStorage.getItem(localStorageDataKey)
	const data = JSON.parse(storageData) || []

	if (data.length) {
		data.forEach(item => store.add(item))
	}
}

export const saveInStorage = () => {
	const data = store.getAll()

	if (!data.length) {
		localStorage.setItem(localStorageDataKey, '[]')
		return
	}

	localStorage.setItem(localStorageDataKey, JSON.stringify(data))
}

export {
	store
}