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
	requestLocalColor,
	receiveLocalColor,
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

export const fetchLocalColor = () => dispatch => {
	dispatch(requestLocalColor())
	const colorMode = localStorage.getItem('colorMode')
	dispatch(receiveLocalColor(colorMode))
}

export const setLocalColor = colorMode => dispatch => {
	dispatch(requestLocalColor())
	localStorage.setItem('colorMode', colorMode)
	dispatch(receiveLocalColor(colorMode))
}

export const createUser = (uid, email, username) => dispatch => {
	dispatch(requestNewUser())

	const initialUserState = { email, username }
	const userLowerCaps = username.toLowerCase()

	myFirebase
		.database()
		.ref(`users/${uid}`)
		.set(initialUserState)
		.then(() => {
			myFirebase
				.database()
				.ref(`userList`)
				.update({ [userLowerCaps]: true })
				.then(() => {
					dispatch(receiveNewUser({ email, username }))
				})
				.catch(error => {
					console.log(error)
					dispatch(newUserError(error.message))
				})
		})
		.catch(error => {
			console.log(error)
			dispatch(newUserError(error.message))
		})
}

export const fetchUser = uid => dispatch => {
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
