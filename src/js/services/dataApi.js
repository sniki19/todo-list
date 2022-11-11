import { DataStore } from './dataStore'

const localStorageDataKey = 'TODO-LIST'

export const getApi = (props = {}) => {
	const { name } = props
	const store = new DataStore(name)

	// window.addEventListener('load', () => {
	// 	const storageData = localStorage.getItem(localStorageDataKey)
	// 	const dataList = JSON.parse(storageData) || []

	// 	dataList.forEach(data => store.add(data))
	// })

	// window.addEventListener('beforeunload', () => {
	// 	if (!store.length) {
	// 		localStorage.setItem(localStorageDataKey, '[]')
	// 		return
	// 	}

	// 	localStorage.setItem(localStorageDataKey,  JSON.stringify(store.getAll()))
	// })

	return store
}