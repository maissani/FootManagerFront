import { ADD_RECRUIT, REMOVE_RECRUIT } from '.'

export function addRecruit(id) {
	return {
		type: ADD_RECRUIT,
		id,
	}
}

export function removeRecruit(recruit) {
	return {
		type: REMOVE_RECRUIT,
		recruit,
	}
}
