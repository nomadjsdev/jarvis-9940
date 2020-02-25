import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import myFirebase from 'Service/Firebase'

import LocalUsernameForm from 'Component/LocalUsernameForm'
import { SubmitButton, FieldContainer, FieldWarning } from 'Component/Global/Form'

const Join = () => {
	let history = useHistory()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const localUsername = useSelector(state => state.user.localUsername)

	const [sessionError, setSessionError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	useEffect(() => {
		setSessionError(null)
	}, [errors?.sessionIdField])

	const sessionSubmit = data => {
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
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
				<div style={{ flex: '0 0 30%' }}>
					{!isAuthenticated && !localUsername && <LocalUsernameForm />}
					{(isAuthenticated || localUsername) && (
						<React.Fragment>
							<h1>Join a session</h1>
							<form onSubmit={handleSubmit(sessionSubmit)}>
								<p>
									<label htmlFor="sessionIdField">Enter the session ID</label>
								</p>
								<FieldContainer>
									<input
										type="text"
										id="sessionIdField"
										name="sessionIdField"
										style={{ width: '100%', height: '30px' }}
										ref={register({
											required: { value: true, message: 'Session ID is required' },
											minLength: { value: 6, message: 'Session ID should be 6 characters' },
											maxLength: { value: 6, message: 'Session ID should be 6 characters' },
										})}
									/>
									{errors?.sessionIdField?.message && <FieldWarning>!!</FieldWarning>}
								</FieldContainer>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<SubmitButton type="submit" disabled={isSubmitting}>
										Join
									</SubmitButton>
								</div>
							</form>
						</React.Fragment>
					)}
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
