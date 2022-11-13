import { createButtonComponent, createContainerComponent, createTextboxComponent } from './shared'

export const createFilterFormComponent = filterHandler => {
	const allFilterBtn = createButtonComponent({
		className: 'btn show-all-btn',
		value: 'Show All',
		onClick: () => {
			searchFilterInput.value = null
			filterHandler(item => item)
		}
	})

	const completedFilterBtn = createButtonComponent({
		className: 'btn show-completed-btn',
		value: 'Show Completed',
		onClick: () => {
			searchFilterInput.value = null
			filterHandler(item => item.checked)
		}
	})

	const searchFilterInput = createTextboxComponent({
		className: 'search-input',
		placeholder: 'Search...',
		onChange: (e) => {
			const searchText = e.target.value
			filterHandler(item => item.text.includes(searchText))
		}
	})

	const form = createContainerComponent({
		className: 'filters',
		children: [allFilterBtn, completedFilterBtn, searchFilterInput]
	})
	return form
}