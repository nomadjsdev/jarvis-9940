import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

import { verifyAuth } from 'Store/Feature/auth'

const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: [thunk],
		devTools: process.env.NODE_ENV === 'development',
		// preloadedState: persistedState,
	})

	store.dispatch(verifyAuth())

	return store
}

export default createStore
