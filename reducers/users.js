import { SET_TOKEN, REMOVE_TOKEN } from '../actions'

export default function(state = {}, action) {
	const { type, token } = action

	switch (type) {
		case SET_TOKEN:
			return { token }
		case REMOVE_TOKEN:
			return {}
		default:
			return state
	}
}
