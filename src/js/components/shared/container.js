import { renderElement } from '../../utils'

const createElement = (tagName, id, className) => renderElement(tagName, {
	id,
	className
})

export const createContainerComponent = (props = {}) => {
	const { tagName = 'div', id, className, children = null, onClick } = props

	const element = createElement(tagName, id, className)

	if (Array.isArray(children) && children.length) {
		element.append(...children)
	}

	if (onClick && typeof onClick === 'function') {
		element.addEventListener('click', onClick)
	}

	return element
}