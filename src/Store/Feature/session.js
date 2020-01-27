import myFirebase from 'Service/Firebase'

import {
	requestJoinSession,
	receiveJoinSession,
	joinSessionError,
	requestCreateSession,
	receiveCreateSession,
	createSessionError,
} from 'Store/Slice/session'

export const joinSession = sessionId => dispatch => {
	dispatch(requestJoinSession())

	myFirebase
		.database()
		.ref(`session/${sessionId}`)
		.once('value') // FIXME: This should not be `once` - needs realtime connection
		// Can a `.then` follow a realtime connection?
		.then(() => {
			// TODO: Should a user be added to a session userlist?
			// What happens when they leave or crash out of the session?
			// Does the session owner need to be able to remove idle players?
			// What happens when the owner removes an active player?
			dispatch(receiveJoinSession(sessionId))
		})
		.catch(error => {
			console.log(error)
			dispatch(joinSessionError(error.message))
		})
}

export const createSession = () => dispatch => {
	dispatch(requestCreateSession())

	// TODO: create session ID
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
