import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	sessionId: false,
	isValid: false,
	isJoining: false,
	isCreating: false,
	joinSessionError: false,
	createSessionError: false,
}

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		requestJoinSession(state, action) {
			state.isJoining = true
			state.isValid = false
			state.joinSessionError = false
		},
		receiveJoinSession(state, action) {
			state.isJoining = false
			state.isValid = true
			state.sessionId = action.payload.sessionId
		},
		joinSessionError(state, action) {
			state.isJoining = false
			state.isValid = false
			state.joinSessionError = action.payload
		},
		requestCreateSession(state, action) {
			state.isCreating = true
			state.createSessionError = false
		},
		receiveCreateSession(state, action) {
			state.isCreating = false
			state.isValid = true
			// TODO:
			// state.sessionId = action.payload.sessionId
		},
		createSessionError(state, action) {
			state.isCreating = false
			state.isValid = false
			state.createSessionError = action.payload
		},
	},
})

export const {
	requestJoinSession,
	receiveJoinSession,
	joinSessionError,
	requestCreateSession,
	receiveCreateSession,
	createSessionError,
} = sessionSlice.actions

export default sessionSlice.reducer
