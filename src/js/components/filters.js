import { uid } from '../utils/tools'
import { createButtonComponent, createContainerComponent, createTextboxComponent } from './shared'

const render = (props) => {
	const { onChange: onFilterClick, className = 'filters' } = props

	const allFilterBtn = createButtonComponent({
		className: 'btn show-all-btn',
		value: 'Show All',
		onClick: () => {
			searchFilterInput.value = null
			onFilterClick(item => item)
		}
	})

	const completedFilterBtn = createButtonComponent({
		className: 'btn show-completed-btn',
		value: 'Show Completed',
		onClick: () => {
			searchFilterInput.value = null
			onFilterClick(item => item.checked)
		}
	})

	const searchFilterInput = createTextboxComponent({
		className: 'search-input',
		placeholder: 'Search...',
		onChange: (e) => {
			const searchText = e.target.value
			onFilterClick(item => item.text.includes(searchText))
		}
	})

	const container = createContainerComponent({
		id: uid(),
		className,
		children: [allFilterBtn, completedFilterBtn, searchFilterInput]
	})

	return container
}

export const createTodoFiltersComponent = (props) => {
	const container = render(props)
	return container
}