import { generateElement } from '../../utils/renderTemplates'

const createElement = (className, checked) => generateElement('input', {
	type: 'checkbox',
	className,
	checked
})

export const createCheckboxComponent = (props = {}) => {
	const { className, checked, onChange } = props

	const element = createElement(className, checked)
	if (onChange && typeof onChange === 'function') {
		element.addEventListener('change', onChange)
	}

	return element
}