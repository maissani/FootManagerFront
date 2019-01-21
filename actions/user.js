import { SET_TOKEN, REMOVE_TOKEN } from '.'

export function setToken(token) {
	return {
		type: SET_TOKEN,
		token,
	}
}

export function removeToken(token) {
	return {
		type: REMOVE_TOKEN,
		token,
	}
}
