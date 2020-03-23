import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from 'Store/createStore'
import { Normalize } from 'styled-normalize'

import App from 'View/App'

import { Global } from 'Styles/Global.styles'

const store = createStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Normalize />
			<Global />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)
