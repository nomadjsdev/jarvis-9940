import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isCreating: false,
	createSessionError: false,
}

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		requestCreateSession(state, action) {
			state.isCreating = true
			state.createSessionError = false
		},
		receiveCreateSession(state, action) {
			state.isCreating = false
			state.isValid = true
		},
		createSessionError(state, action) {
			state.isCreating = false
			state.isValid = false
			state.createSessionError = action.payload
		},
	},
})

export const { requestCreateSession, receiveCreateSession, createSessionError } = sessionSlice.actions

export default sessionSlice.reducer
