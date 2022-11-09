import { isObject } from '../utils/tools'

const getInstance = () => {
	let source = []

	return {
		getAll: () => ([...source]),
		getFiltered: filter => ([...source.filter(filter)]),
		getById: id => ({ ...source.find(item => item.id === id) }),
		add: item => {
			if (!isObject(item) && item.id) {
				return false
			}

			source.push(item)
			return this
		},
		update: (id, data) => {
			if (!isObject(data) && id) {
				return false
			}

			let target = source.find(item => item.id === id)
			if (!target) {
				return false
			}

			target.update(data)
			return true
		},
		remove: id => {
			const newSource = source.filter(item => item.id !== id)
			const itemWasDeleted = source.length !== newSource.length
			source = newSource
			return itemWasDeleted
		},
		clean: () => {
			source = []
			return this
		},
		get length() {
			return source.length
		}
	}
}

export const DataStore = (() => {
	let instance = null

	return function() {
		if (!new.target) {
			throw new Error('`Singleton()` must be called with `new`')
		}

		if (!instance) {
			instance = getInstance()
		}

		return instance
	}
})()
