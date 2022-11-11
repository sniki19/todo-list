import { getApi } from '../services/dataApi'
import { createTodoFiltersComponent } from './filters'
import { createContainerComponent } from './shared'
import { createTodoCountersComponent } from './todoCounters'

const render = (props) => {
	const { dataApi, setFilterForCards } = props

	const [counterForm] = createTodoCountersComponent()

	const filters = createTodoFiltersComponent({
		onChange: (filter) => {
			const cardsIds = dataApi.getFiltered(filter).map(item => item.id)
			setFilterForCards(cardsIds)
		}
	})

	const actionLine2 = createContainerComponent({
		id: 'actionLine2',
		className: 'action-line',
		children: [counterForm, filters]
	})

	return actionLine2
}

export const createActionLine2Component = (props) => {
	const dataApi = getApi()
	return render({dataApi, ...props})
}
