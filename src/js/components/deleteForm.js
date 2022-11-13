import { store } from '../services/dataApi'
import { createButtonComponent, createContainerComponent } from './shared'

export const createDeleteFormComponent = (deleteAllCardsHandler, deleteCardHandler) => {
	const deleteAllBtn = createButtonComponent({
		className: 'btn delete-all-btn',
		value: 'Delete All',
		onClick: () => deleteAllCardsHandler()
	})

	const deleteLastBtn = createButtonComponent({
		className: 'btn delete-last-btn',
		value: 'Delete Last',
		onClick: () => {
			const all = store.getAll()
			if (all.length) {
				deleteCardHandler(all[all.length - 1].id)
			} else {
				alert('Todo list is empty')
			}
		}
	})

	const form = createContainerComponent({
		className: 'delete-actions',
		children: [deleteAllBtn, deleteLastBtn]
	})
	return form
}