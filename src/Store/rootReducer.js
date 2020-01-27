import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './Slice/auth'
import userReducer from './Slice/user'
import sessionReducer from './Slice/session'

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	session: sessionReducer,
})
