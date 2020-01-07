import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './Slice/auth'
import userReducer from './Slice/user'

export default combineReducers({
	auth: authReducer,
	user: userReducer,
})
