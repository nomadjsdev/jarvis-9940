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

import { createUser, fetchUser, clearUser } from 'Store/Feature/user'

export const registerUser = (email, password) => dispatch => {
	dispatch(requestRegister())

	myFirebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(receiveRegister())
			return response
		})
		.then(userObj => {
			dispatch(createUser(userObj.user.uid, userObj.user.email))
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
