import { createActionLine1Component } from './components/actionLine1'
import { createDataContainerComponent } from './components/dataContainer'
/*import { updateCounters } from './components/todoCounters'*/
import { store } from './services/dataApi'

export function createAppComponent() {
	// const [todoListContainer, createCard, deleteCards, setFilterForCards, deleteAllCards] = createDataContainerComponent({
	// 	updateCounters
	// })

	// const actionLine2 = createActionLine2Component({
	// 	setFilterForCards
	// })

	// const actionLine1 = createActionLine1Component({
	// 	updateCounters,
	// 	deleteCards,
	// 	createCard,
	// 	deleteAllCards
	// })




	// const actionLine2 = createActionLine2Component()

	const dataContainer = createDataContainerComponent()
	dataContainer.loadData(store.getAll())

	const actionLine1 = createActionLine1Component(dataContainer)

	const appComponent = document.createDocumentFragment()
	appComponent.append(actionLine1.element, dataContainer.element)

	return appComponent
}

