import { isObject } from './tools'

export function DataBase() {
	source = []

	return {
		push: item => {
			if (!isObject(item) && item.id) {
				return false
			}

			source.push(item)
			return this
		},
		remove: id => {
			const newSource = source.filter(item => item.id !== id)
			const itemWasDeleted = source.length !== newSource.length
			source = newSource
			return itemWasDeleted
		},
		getAll: () => {
			return [...source]
		},
		getFiltered: filter => {
			return [...source.filter(filter)]
		},
		getById: id => {
			return {...source.find(item => item.id === id)}
		},
		put: (id, data) => {
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
		clean: () => {
			source = []
			return this
		},
		get length() {
			return source.length
		}
	}
}
