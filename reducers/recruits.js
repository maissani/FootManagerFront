import { ADD_RECRUIT, REMOVE_RECRUIT } from '../actions'

export default function(state = [], action) {
	const { type, id, recruit } = action

	switch (type) {
		case ADD_RECRUIT:
			return [
				...state,
				{
					id,
				},
			]
		case REMOVE_RECRUIT:
			return state.filter(i => i !== recruit)
		default:
			return state
	}
}
