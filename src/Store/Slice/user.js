import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isCreating: false,
	isLoading: false,
	isClearing: false,
	createUserError: false,
	loadUserError: false,
	clearUserError: false,
	details: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		requestNewUser(state, action) {
			state.isCreating = true
			state.createUserError = false
		},
		receiveNewUser(state, action) {
			state.isCreating = false
			state.details = { email: action.payload.email }
		},
		newUserError(state, action) {
			state.isCreating = false
			state.createUserError = action.payload
		},
		requestLoadUser(state, action) {
			state.isLoading = true
			state.loadUserError = false
		},
		receiveLoadUser(state, action) {
			state.isLoading = false
			state.details = action.payload
		},
		loadUserError(state, action) {
			state.isLoading = false
			state.loadUserError = action.payload
		},
		requestClearUser(state, action) {
			state.isClearing = true
			state.clearUserError = false
			state.details = null
		},
		receiveClearUser(state, action) {
			state.isClearing = false
		},
		clearUserError(state, action) {
			state.isClearing = false
			state.clearUserError = action.payload
		},
	},
})

export const {
	requestNewUser,
	receiveNewUser,
	newUserError,
	requestLoadUser,
	receiveLoadUser,
	loadUserError,
	requestClearUser,
	receiveClearUser,
	clearUserError,
} = userSlice.actions

export default userSlice.reducer
