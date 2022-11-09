import { DataStore } from './data-store'

const localStorageDataKey = 'TODO-LIST'

const initializeLoad = (store, onLoad, dataToInstanceMapper) => {
	window.addEventListener('load', () => {
		const storageData = localStorage.getItem(localStorageDataKey)
		const dataList = JSON.parse(storageData) || []

		dataList.forEach(data => store.add(dataToInstanceMapper(data)))
	})

	if (typeof onLoad === 'function') {
		window.addEventListener('load', e => onLoad(e, store))
	}

	if (Array.isArray(onLoad) && onLoad.length) {
		window.addEventListener('load', e => onLoad.forEach(cb => cb(e, store)))
	}
}

const initializeSave = (store, onSave, instanceToDataMapper) => {
	window.addEventListener('beforeunload', () => {
		const storeDataList = store.getAll()

		if (!storeDataList.length) {
			localStorage.setItem(localStorageDataKey, JSON.stringify(storeDataList))
			return
		}

		const data = storeDataList.map(item => instanceToDataMapper(item))
		localStorage.setItem(localStorageDataKey, JSON.stringify(data))
	})

	if (typeof onSave === 'function') {
		window.addEventListener('beforeunload', e => onSave(e, store))
	}

	if (Array.isArray(onSave) && onSave.length) {
		window.addEventListener('beforeunload', e => onSave.forEach(cb => cb(e, store)))
	}
}

export default props => {
	const { onLoad, onSave, dataToInstanceMapper, instanceToDataMapper } = props
	const dataStore = new DataStore()

	if (onLoad && dataToInstanceMapper) {
		initializeLoad(dataStore, onLoad, dataToInstanceMapper)
	}

	if (onSave && instanceToDataMapper) {
		initializeSave(dataStore, onSave, instanceToDataMapper)
	}

	return dataStore
}