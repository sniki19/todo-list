import { getApi } from '../services/dataApi'
import { createTodoFiltersComponent } from './filters'
import { createTodoCountersComponent } from './todoCounters'
import { createContainerComponent } from './shared'

const render = (props) => {
	const { dataApi, setFilterForCards } = props

	const [counterForm, updateCounters] = createTodoCountersComponent()

	const setNewCountersValue = () => {
		const allTodos = dataApi.length
		const completedTodos = dataApi.getFiltered(todo => todo.checked).length

		updateCounters(allTodos, completedTodos)
	}

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

	return [actionLine2, setNewCountersValue]
}

export const createActionLine2Component = (props) => {
	const dataApi = getApi()
	return render({dataApi, ...props})
}
