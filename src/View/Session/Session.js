import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Session = () => {
	const { sessionIdFromParams } = useParams()
	const isAuthenticated = useSelector(state => state.auth?.isAuthenticated)
	const sessionId = useSelector(state => state.session?.sessionId)
	const isValid = useSelector(state => state.session?.isValid)

	if (!sessionIdFromParams || !sessionId) {
		return (
			<>
				<h1>Session ID is required</h1>
				<p>
					<Link to="/join">Join an existing session</Link>
				</p>
				<p>or</p>
				{isAuthenticated && (
					<>
						<p>
							<Link to="/create">Create a new session</Link>
						</p>
					</>
				)}
				{!isAuthenticated && (
					<>
						<p>
							<Link to="/login">login</Link> to create a new session
						</p>
						<p>
							No account? <Link to="/register">Register now to create sessions</Link>
						</p>
					</>
				)}
			</>
		)
	}

	// if (!sessionId) {
	// 	// TODO: Redirect to join
	// 	// Use sessionId as param, or hold in state?
	// 	return (
	// 		<>
	// 			<h1>Redirecting to Join</h1>
	// 		</>
	// 	)
	// }

	// FIXME: Is it worth forcing all join actions to go through /join?
	// pro: it keeps logic in one place
	// con: is a bit convoluted? Could also move join logic elsewhere and import in both /session and /join
	// But then why have a /join at all?

	if (sessionIdFromParams !== sessionId || !isValid) {
		// TODO: Forward to join?
		return (
			<>
				<h1>Something funky has happened</h1>
			</>
		)
	}

	return (
		<>
			<h1>Session</h1>
			<h2>ID: {sessionIdFromParams}</h2>
		</>
	)
}

export default Session
