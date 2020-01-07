import myFirebase from 'Service/Firebase'

import {
	requestNewUser,
	receiveNewUser,
	newUserError,
	requestLoadUser,
	receiveLoadUser,
	loadUserError,
	requestClearUser,
	receiveClearUser,
	// clearUserError,
} from 'Store/Slice/user'

export const createUser = (uid, email, username) => dispatch => {
	dispatch(requestNewUser())

	const initialUserState = { email, username }

	myFirebase
		.database()
		.ref(`user/${uid}`)
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
		.ref(`user/${uid}`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadUser(snapshot.val()))
			return snapshot.val()
		})
		.then(value => {
			// Do clan / group fetching here?
			// console.log(value)
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
