import React from 'react'
import { Link } from 'react-router-dom'

const SessionError = ({ isAuthenticated }) => {
	return (
		<React.Fragment>
			<h1>Session ID is required</h1>
			<p>
				<Link to="/join">Join an existing session</Link>
			</p>
			<p>or</p>
			{isAuthenticated && (
				<React.Fragment>
					<p>
						<Link to="/create">Create a new session</Link>
					</p>
				</React.Fragment>
			)}
			{!isAuthenticated && (
				<React.Fragment>
					<p>
						<Link to="/login">login</Link> to create a new session
					</p>
					<p>
						No account? <Link to="/register">Register now to create sessions</Link>
					</p>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default SessionError
