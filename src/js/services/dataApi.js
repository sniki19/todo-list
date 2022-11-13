import { uid } from '../utils'
import { dataStore } from './dataStore'

const localStorageDataKey = 'TODO-LIST'
const store = dataStore.getInstance('dataApiJs')

const generateNewTodoData = text => ({
	id: uid(),
	checked: false,
	text: text,
	date: new Date().toLocaleDateString()
})

const initStore = () => {
	const storageData = localStorage.getItem(localStorageDataKey)
	const data = JSON.parse(storageData) || []

	if (data.length) {
		data.forEach(item => store.add(item))
	}
}

const saveInStorage = () => {
	const data = store.getAll()

	if (!data.length) {
		localStorage.setItem(localStorageDataKey, '[]')
		return
	}

	localStorage.setItem(localStorageDataKey, JSON.stringify(data))
}

export {
	store,
	generateNewTodoData,
	initStore,
	saveInStorage
}
