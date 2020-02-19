import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import myFirebase from 'Service/Firebase'

import { StyledHeader, JoinButton } from './Join.styles'

const Join = () => {
	let history = useHistory()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const [sessionError, setSessionError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	useEffect(() => {
		setSessionError(null)
	}, [errors?.sessionIdField])

	const onSubmit = data => {
		setIsSubmitting(true)
		const { sessionIdField } = data
		setSessionError(null)

		myFirebase
			.database()
			.ref(`sessions/${sessionIdField.toUpperCase()}`)
			.once('value')
			.then(snapshot => {
				if (snapshot.exists()) {
					history.push(`/session/${sessionIdField.toUpperCase()}`)
				} else {
					setSessionError(`That session ID wasn't found - please check it's correct.`)
					setIsSubmitting(false)
				}
			})
	}

	return (
		<React.Fragment>
			<StyledHeader>Join a session</StyledHeader>
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
				<div style={{ flex: '0 0 30%' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="sessionIdField">Enter the session ID</label>
						</p>
						<p>
							<input
								type="text"
								id="sessionIdField"
								name="sessionIdField"
								style={{ width: '100%', height: '30px' }}
								ref={register({
									required: true,
									minLength: { value: 6, message: 'Session ID should be 6 characters' },
									maxLength: { value: 6, message: 'Session ID should be 6 characters' },
								})}
							/>
							{errors?.sessionIdField?.message && <span style={{ color: 'red', fontWeight: 'bold' }}> !!</span>}
						</p>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<JoinButton type="submit" disabled={isSubmitting}>
								Join
							</JoinButton>
						</div>
					</form>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p style={{ color: 'red', fontWeight: 'bold' }}>
						{errors?.sessionIdField?.message && <span>{errors.sessionIdField.message}</span>}
						{sessionError && <span>{sessionError}</span>}
						{!errors?.sessionIdField?.message && !sessionError && <span>&nbsp;</span>}
					</p>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p>
						Want to create a new session instead?{' '}
						{isAuthenticated ? <Link to="/create">Start here!</Link> : <Link to="/register">Register now!</Link>}
					</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Join
