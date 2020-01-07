import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoggingIn: false,
	isLoggingOut: false,
	isVerifying: false,
	isRegistering: false,
	isResetting: false,
	loginError: false,
	logoutError: false,
	registerError: false,
	resetError: false,
	isAuthenticated: false,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		requestRegister(state, action) {
			state.isRegistering = true
			state.registerError = false
		},
		receiveRegister(state, action) {
			state.isRegistering = false
		},
		registerError(state, action) {
			state.isRegistering = false
			state.registerError = action.payload
		},
		requestVerify(state, action) {
			state.isVerifying = true
		},
		receiveVerify(state, action) {
			state.isVerifying = false
		},
		requestLogin(state, action) {
			state.isLoggingIn = true
			state.loginError = false
		},
		receiveLogin(state, action) {
			state.isLoggingIn = false
			state.isAuthenticated = true
			state.user = action.payload
		},
		receiveLocalAuth(state, action) {
			state.isLoggingIn = false
			state.isAuthenticated = true
			state.user = action.payload
		},
		loginError(state, action) {
			state.isLoggingIn = false
			state.loginError = action.payload
		},
		requestLogout(state, action) {
			state.isLoggingOut = true
			state.logoutError = false
		},
		receiveLogout(state, action) {
			state.isLoggingOut = false
			state.isAuthenticated = false
			state.user = null
		},
		logoutError(state, action) {
			state.isLoggingOut = false
			state.logoutError = action.payload
		},
		requestReset(state, action) {
			state.isResetting = true
			state.resetError = false
		},
		receiveReset(state, action) {
			state.isResetting = false
		},
		resetError(state, action) {
			state.isResetting = false
			state.resetError = action.payload
		},
	},
})

export const {
	requestRegister,
	receiveRegister,
	registerError,
	requestVerify,
	receiveVerify,
	requestLogin,
	receiveLogin,
	receiveLocalAuth,
	loginError,
	requestLogout,
	receiveLogout,
	logoutError,
	requestReset,
	receiveReset,
	resetError,
} = authSlice.actions

export default authSlice.reducer
