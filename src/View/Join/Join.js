import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import myFirebase from 'Service/Firebase'

import LocalUsernameForm from 'Component/LocalUsernameForm'
import { Page, PrimarySection, SecondarySection } from 'Component/Global/Layout'
import {
	SubmitContainer,
	SubmitButton,
	FieldContainer,
	FieldWarning,
	InputField,
	ErrorText,
} from 'Component/Global/Form'

const Join = () => {
	let history = useHistory()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const localUsername = useSelector(state => state.user.localUsername)

	const [sessionError, setSessionError] = React.useState(null)
	const [isSubmitting, setIsSubmitting] = React.useState(false)

	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	React.useEffect(() => {
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
			<Page>
				<PrimarySection>
					{!isAuthenticated && !localUsername && <LocalUsernameForm />}

					{(isAuthenticated || localUsername) && (
						<React.Fragment>
							<h1>Join a session</h1>
							<form onSubmit={handleSubmit(sessionSubmit)}>
								<p>
									<label htmlFor="sessionIdField">Enter the session ID</label>
								</p>
								<FieldContainer>
									<InputField
										type="text"
										id="sessionIdField"
										name="sessionIdField"
										ref={register({
											required: { value: true, message: 'Session ID is required' },
											minLength: { value: 6, message: 'Session ID should be 6 characters' },
											maxLength: { value: 6, message: 'Session ID should be 6 characters' },
										})}
									/>
									{errors?.sessionIdField?.message && <FieldWarning>!!</FieldWarning>}
								</FieldContainer>
								<SubmitContainer>
									{isSubmitting && <p>Finding session...</p>}
									<SubmitButton type="submit" disabled={isSubmitting}>
										Join
									</SubmitButton>
								</SubmitContainer>
							</form>
						</React.Fragment>
					)}
				</PrimarySection>
				<SecondarySection>
					<ErrorText>
						{errors?.sessionIdField?.message && <span>{errors.sessionIdField.message}</span>}
						{sessionError && <span>{sessionError}</span>}
						{!errors?.sessionIdField?.message && !sessionError && <span>&nbsp;</span>}
					</ErrorText>
				</SecondarySection>
				<SecondarySection>
					<p>
						Want to create a new session instead?{' '}
						{isAuthenticated ? <Link to="/create">Start here!</Link> : <Link to="/register">Register now!</Link>}
					</p>
				</SecondarySection>
			</Page>
		</React.Fragment>
	)
}

export default Join
