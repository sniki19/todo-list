import { isObject } from '../utils'

const createStoreInstance = (name = 'default') => {
	let source = []

	return {
		name: name,
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
		update: (data) => {
			if (!isObject(data) && data.id) {
				return false
			}

			let target = source.find(item => item.id === data.id)
			if (!target) {
				return false
			}

			for (const prop in data) {
				if (prop !== 'id') {
					target[prop] = data[prop]
				}
			}
			return true
		},
		delete: id => {
			const newSource = source.filter(item => item.id !== id)
			const itemWasDeleted = source.length !== newSource.length
			source = newSource
			return itemWasDeleted
		},
		clean: () => {
			source = []
			return true
		},
		get length() {
			return source.length
		}
	}
}

export const dataStore = (() => {
	let instance = null

	return {
        getInstance: (name) => {
            if (!instance) {
                instance = createStoreInstance(name)
            }
            return instance
        }
    }
})()
