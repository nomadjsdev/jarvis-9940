import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from 'View/Home'
import Register from 'View/Register'
import PasswordReset from 'View/PasswordReset'
import Login from 'View/Login'
import Session from 'View/Session'
import Create from 'View/Session/Create'
import Join from 'View/Session/Join'
import Profile from 'View/Profile'

import Navbar from 'Component/Navbar'

const App = () => {
	const { isLoggingIn, isLoggingOut, isVerifying, isAuthenticated } = useSelector(state => state.auth)
	const { isCreating, isLoading } = useSelector(state => state.user)

	if (isLoggingIn) {
		return (
			<>
				<h1>Logging in</h1>
			</>
		)
	}
	if (isLoggingOut) {
		return (
			<>
				<h1>Logging out</h1>
			</>
		)
	}
	if (isVerifying) {
		return (
			<>
				<h1>Verifying</h1>
			</>
		)
	}
	if (isCreating) {
		return (
			<>
				<h1>Creating user</h1>
			</>
		)
	}
	if (isLoading) {
		return (
			<>
				<h1>Loading</h1>
			</>
		)
	}

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/register">{isAuthenticated ? <Redirect to="/" /> : <Register />}</Route>
				<Route path="/passwordreset">{isAuthenticated ? <Redirect to="/" /> : <PasswordReset />}</Route>
				<Route path="/login">{isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
				<Route path="/session/:sessionId?">
					<Session /> {/* TODO: Checking whether logged in or has username set should happen here or on page? */}
				</Route>
				<Route path="/create">{isAuthenticated ? <Create /> : <Redirect to="/login" />}</Route>
				<Route path="/join">
					<Join /> {/* TODO: Checking whether logged in or has username set should happen here or on page? */}
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/" exact>
					<Home />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
