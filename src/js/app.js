import { createContainerComponent } from './components/shared'
import {
	createAddFormComponent,
	createCounterComponent,
	createDataContainerComponent,
	createDeleteFormComponent,
	createFilterFormComponent
} from './components/todoComponents'
import { store } from './services/dataApi'

export function createAppComponent() {
	const counters = createCounterComponent()

	const dataContainer = createDataContainerComponent(counters.updateValues)
	dataContainer.loadData(store.getAll())

	const deleteForm = createDeleteFormComponent(dataContainer.deleteAllCards, dataContainer.deleteCard)
	const addForm = createAddFormComponent(dataContainer.addCard)

	const actionLine1 = createContainerComponent({
		id: 'actionLine1',
		className: 'action-line',
		children: [deleteForm, addForm]
	})

	const filterForm = createFilterFormComponent(dataContainer.displayFilter)

	const actionLine2 = createContainerComponent({
		id: 'actionLine2',
		className: 'action-line',
		children: [counters.element, filterForm]
	})

	const appComponent = document.createDocumentFragment()
	appComponent.append(actionLine1, actionLine2, dataContainer.element)

	return appComponent
}