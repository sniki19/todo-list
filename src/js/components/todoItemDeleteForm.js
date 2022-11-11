import { uid } from '../utils/tools'
import { createButtonComponent, createContainerComponent } from './shared'

const render = props => {
	const { onClick: onDeleteClick, className = 'delete-actions' } = props

	const deleteAllBtn = createButtonComponent({
		className: 'btn delete-all-btn',
		value: 'Delete All',
		onClick: (e) => {
			onDeleteClick('all')
		}
	})

	const deleteLastBtn = createButtonComponent({
		className: 'btn delete-last-btn',
		value: 'Delete Last',
		onClick: (e) => {
			onDeleteClick('last')
		}
	})

	const container = createContainerComponent({
		id: uid(),
		className,
		children: [deleteAllBtn, deleteLastBtn]
	})
	return container
}

export const createDeleteTodoFormComponent = props => {
	const container = render(props)
	return container
}