import { getApi } from '../services/dataApi'
import { uid } from '../utils/tools'
import { todoItemListContainerComponent } from './todoItemListContainer'

const render = (props) => {
	const { dataApi, updateCounters } = props

	return todoItemListContainerComponent({
		id: uid(),
		className: 'container-todos',
		data: dataApi.getAll(),
		onDeleteClick: (id) => {
			const result = dataApi.remove(id)
			if (result) {
				updateCounters()
			}
			return result
		},
		onCompleteClick: (id) => {
			const result = dataApi.update({
				id: id,
				checked: true
			})
			if (result) {
				updateCounters()
			}
			return result
		}
	})
}

export const createDataContainerComponent = (props) => {
	const dataApi = getApi()
	const [todoListContainer, createCard, deleteCards, setFilterForCards] = render({ dataApi, ...props })

	// window.addEventListener('load', () => {
	// 	if (dataApi.length) {
	// 		dataApi.getAll().forEach(data => {
	// 			createCard(data)
	// 		})
	// 	}
	// })

	return [todoListContainer, createCard, deleteCards, setFilterForCards]
}
