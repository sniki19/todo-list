import { renderElement } from '../../utils'

const createElement = (className, value, placeholder, readOnly) => renderElement('input', {
	type: 'text',
	value,
	className,
	placeholder,
	readOnly
})

export const createTextboxComponent = (props = {}) => {
	const { className, value, placeholder, readOnly, onChange } = props

	const element = createElement(className, value, placeholder, readOnly)
	if (onChange && typeof onChange === 'function') {
		element.addEventListener('keyup', onChange)
	}

	return element
}