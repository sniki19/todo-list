const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

const isObject = obj => obj != null && obj.constructor.name === 'Object'

export {
	uid,
	isObject
}