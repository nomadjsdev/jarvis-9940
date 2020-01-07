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

export const createUser = (uid, email) => dispatch => {
	dispatch(requestNewUser())

	myFirebase
		.firestore()
		.collection(`user`)
		.doc(uid)
		.set({ email })
		.then(() => {
			dispatch(receiveNewUser({ email }))
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
		.firestore()
		.collection(`user`)
		.doc(uid)
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such user', doc)
				dispatch(loadUserError('No user found'))
			} else {
				dispatch(receiveLoadUser(doc.data()))
				return doc.data()
			}
		})
		.then(value => {
			// Do clan / group fetching here?
			console.log(value)
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
