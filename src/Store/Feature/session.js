import myFirebase from 'Service/Firebase'

import { requestCreateSession, receiveCreateSession, createSessionError } from 'Store/Slice/session'

export const createSession = () => dispatch => {
	dispatch(requestCreateSession())

	// TODO: check session ID not already in use
	const sessionTemplate = { key: true }

	myFirebase
		.database()
		.ref(`session`)
		.set({ sessionId: sessionTemplate })
		.then(() => {
			dispatch(receiveCreateSession())
		})
		.catch(error => {
			console.log(error)
			dispatch(createSessionError(error.message))
		})
}
