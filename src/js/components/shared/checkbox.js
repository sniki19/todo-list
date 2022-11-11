import { generateElement } from '../../utils/renderTemplates'

export const createCheckboxComponent = (props = {}) => {
	const { className, checked, disabled, onChange } = props

	const element = generateElement('input', {
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