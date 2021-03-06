import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Normalize } from 'styled-normalize'

import Home from 'View/Home'
import About from 'View/About'
import Register from 'View/Register'
import PasswordReset from 'View/PasswordReset'
import Login from 'View/Login'
import Session from 'View/Session'
import Create from 'View/Create'
import Join from 'View/Join'
import Profile from 'View/Profile'

import Loading from 'Component/Global/Loading'
import Navbar from 'Component/Navbar'
import Footer from 'Component/Footer'

import { Global } from 'Styles/Global.styles'
import { MainDiv, Container } from './App.styles'

const App = () => {
	const { isLoggingIn, isLoggingOut, isVerifying, isAuthenticated } = useSelector(state => state.auth)
	const { isCreating, isLoading } = useSelector(state => state.user)

	if (isLoggingIn || isLoggingOut || isVerifying || isCreating || isLoading) {
		return (
			<React.Fragment>
				<Normalize />
				<Global />
				<Loading loadingMessage="Checking latest version" />
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<Normalize />
			<Global />
			<MainDiv>
				<Router>
					<Navbar />
					<Container>
						<Switch>
							<Route path="/about">
								<About />
							</Route>
							<Route path="/register">{isAuthenticated ? <Redirect to="/create" /> : <Register />}</Route>
							<Route path="/passwordreset">{isAuthenticated ? <Redirect to="/create" /> : <PasswordReset />}</Route>
							<Route path="/login">{isAuthenticated ? <Redirect to="/create" /> : <Login />}</Route>
							<Route path="/session/:sessionId?">
								<Session /> {/* TODO: Checking whether logged in or has username set should happen here or on page? */}
							</Route>
							<Route path="/create">{isAuthenticated ? <Create /> : <Redirect to="/login" />}</Route>
							<Route path="/join">
								<Join /> {/* TODO: Checking whether logged in or has username set should happen here or on page? */}
							</Route>
							<Route path="/profile">{isAuthenticated ? <Profile /> : <Redirect to="/login" />}</Route>
							<Route path="/" exact>
								<Home />
							</Route>
						</Switch>
						<Footer />
					</Container>
				</Router>
			</MainDiv>
		</React.Fragment>
	)
}

export default App
