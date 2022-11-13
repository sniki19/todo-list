import { renderElement } from '../../utils'

export const createCheckboxComponent = (props = {}) => {
	const { className, checked, disabled, onChange } = props

	const element = renderElement('input', {
		type: 'checkbox',
		className,
		checked,
		disabled
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('change', onChange)
	}

	return element
}