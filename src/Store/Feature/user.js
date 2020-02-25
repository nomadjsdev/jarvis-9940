import myFirebase from 'Service/Firebase'

import {
	requestNewUser,
	receiveNewUser,
	newUserError,
	requestLoadUser,
	receiveLoadUser,
	loadUserError,
	requestLocalUser,
	receiveLocalUser,
	requestClearUser,
	receiveClearUser,
	// clearUserError,
} from 'Store/Slice/user'

export const fetchLocalUsername = () => dispatch => {
	dispatch(requestLocalUser())
	const localUsername = localStorage.getItem('localUsername')
	dispatch(receiveLocalUser(localUsername))
}

export const setLocalUsername = username => dispatch => {
	dispatch(requestLocalUser())
	localStorage.setItem('localUsername', username)
	dispatch(receiveLocalUser(username))
}

export const createUser = (uid, email, username) => dispatch => {
	dispatch(requestNewUser())

	// TODO: Check username not already in use?
	// Use separate table for all known usernames - array? How to store in NoSQL?

	const initialUserState = { email, username }

	myFirebase
		.database()
		.ref(`users/${uid}`)
		.set(initialUserState)
		.then(() => {
			dispatch(receiveNewUser({ email, username }))
		})
		.catch(error => {
			console.log(error)
			dispatch(newUserError(error.message))
		})
}

export const fetchUser = uid => dispatch => {
	// TODO: Fetch from localstorage for faster load
	// then fetch from firestore (if last fetch was > certain time?,) and update localstorage
	dispatch(requestLoadUser())

	myFirebase
		.database()
		.ref(`users/${uid}`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadUser(snapshot.val()))
			return snapshot.val()
		})
		.catch(error => {
			console.log(error)
			dispatch(loadUserError(error.message))
		})
}

export const clearUser = () => dispatch => {
	dispatch(requestClearUser())
	// Check if user object cleared
	// if success
	dispatch(receiveClearUser())
	// else:
	// dispatch(clearUserError("Error message here"))
}
