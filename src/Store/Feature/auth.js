import myFirebase from 'Service/Firebase'

import {
	requestRegister,
	receiveRegister,
	registerError,
	requestVerify,
	receiveVerify,
	requestLogin,
	receiveLogin,
	loginError,
	receiveLocalAuth,
	requestLogout,
	receiveLogout,
	logoutError,
	requestReset,
	receiveReset,
	resetError,
} from 'Store/Slice/auth'

import { receiveLocalUser, receiveLocalColor } from 'Store/Slice/user'

import { createUser, fetchUser, clearUser } from 'Store/Feature/user'

import { DEFAULT_COLOR_MODE } from 'Utils/Constants'

export const registerUser = (email, password, username) => dispatch => {
	dispatch(requestRegister())

	myFirebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(receiveRegister())
			return response
		})
		.then(userObj => {
			dispatch(createUser(userObj.user.uid, userObj.user.email, username))
		})
		.catch(error => {
			console.log(error)
			dispatch(registerError(error.message))
		})
}

export const verifyAuth = () => dispatch => {
	dispatch(requestVerify())

	const localUser = JSON.parse(localStorage.getItem('authUser'))
	if (localUser) {
		dispatch(receiveLocalAuth(localUser))
	}

	const localUsername = localStorage.getItem('localUsername')
	if (localUsername) {
		dispatch(receiveLocalUser(localUsername))
	}

	const colorMode = localStorage.getItem('colorMode') || DEFAULT_COLOR_MODE
	if (colorMode) {
		dispatch(receiveLocalColor(colorMode))
	}

	myFirebase.auth().onAuthStateChanged(user => {
		if (user !== null) {
			dispatch(receiveLogin(user))
			localStorage.setItem('authUser', JSON.stringify(user))
			dispatch(fetchUser(user.uid))
		} else {
			dispatch(receiveLogout())
			localStorage.removeItem('authUser')
			dispatch(clearUser())
		}
		dispatch(receiveVerify())
	})
}

export const loginUser = (email, password) => dispatch => {
	dispatch(requestLogin())
	myFirebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(userObj => {
			dispatch(receiveLogin(userObj.user))
		})
		.catch(error => {
			console.log(error)
			dispatch(loginError(error.message))
		})
}

export const logoutUser = () => dispatch => {
	dispatch(requestLogout())

	myFirebase
		.auth()
		.signOut()
		.then(() => {
			dispatch(receiveLogout())
		})
		.catch(error => {
			console.log(error)
			dispatch(logoutError(error.message))
		})
}

export const resetPassword = email => dispatch => {
	dispatch(requestReset())

	myFirebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(() => {
			dispatch(receiveReset())
		})
		.catch(error => {
			console.log(error)
			dispatch(resetError(error.message))
		})
}
