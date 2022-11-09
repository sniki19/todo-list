import { generateElement } from '../utils/render-templates'

const generateButton = (className = '', value = '') => {
	return generateElement('input', {
		type: 'button',
		value: value,
		className: className
	})
}

export default props => {
	const { className, value, onClick } = props

	const button = generateButton(className, value)

	if (!onClick) {
		return button
	}

	if (typeof onClick === 'function') {
		button.addEventListener('click', onClick)
	}

	if (Array.isArray(onClick) && onClick.length) {
		button.addEventListener('click', e => onClick.forEach(cb => cb(e)))
	}

	return button
}