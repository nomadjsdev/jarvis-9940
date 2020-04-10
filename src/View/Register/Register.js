import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { registerUser } from 'Store/Feature/auth'

import { Page, PrimarySection, SecondarySection } from 'Component/Global/Layout'
import {
	SubmitContainer,
	SubmitButton,
	FieldContainer,
	FieldWarning,
	InputField,
	ErrorText,
} from 'Component/Global/Form'

const Register = () => {
	const dispatch = useDispatch()
	const registerError = useSelector(state => state.auth.registerError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	const [isSubmitting, setIsSubmitting] = React.useState(false)
	const [viewPassword, setViewPassword] = React.useState(false)

	React.useEffect(() => {
		setIsSubmitting(false)
	}, [registerError])

	const onSubmit = data => {
		setIsSubmitting(true)
		const { usernameField, emailField, passwordField } = data
		dispatch(registerUser(emailField, passwordField, usernameField))
	}

	return (
		<React.Fragment>
			<h1>Register</h1>
			<Page>
				<PrimarySection>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="usernameField">Choose a username</label>
						</p>
						<FieldContainer>
							<InputField
								type="text"
								id="usernameField"
								name="usernameField"
								ref={register({
									required: { value: true, message: 'Username is required' },
									minLength: { value: 3, message: 'Username must be at least 3 characters' },
									maxLength: { value: 16, message: 'Username must be 16 characters or less' },
								})}
							/>
							{errors?.usernameField?.message && <FieldWarning>!!</FieldWarning>}
						</FieldContainer>
						<p>
							<label htmlFor="emailField">Enter your email address</label>
						</p>
						<FieldContainer>
							<InputField
								type="email"
								id="emailField"
								name="emailField"
								ref={register({
									required: { value: true, message: 'Email address is required' },
								})}
							/>
							{errors?.emailField?.message && <FieldWarning>!!</FieldWarning>}
						</FieldContainer>
						<p>
							<label htmlFor="passwordField">Enter a password</label>
							<span
								style={{ float: 'right' }}
								onClick={() => {
									setViewPassword(!viewPassword)
								}}
							>
								{viewPassword ? 'Hide' : 'View'}
							</span>
						</p>
						<FieldContainer>
							<InputField
								type={viewPassword ? 'text' : 'password'}
								id="passwordField"
								name="passwordField"
								ref={register({
									required: { value: true, message: 'Password is required' },
								})}
							/>
							{errors?.passwordField?.message && <FieldWarning>!!</FieldWarning>}
						</FieldContainer>
						<SubmitContainer>
							{isSubmitting && <p>Registering...</p>}
							<SubmitButton type="submit" disabled={isSubmitting}>
								Join
							</SubmitButton>
						</SubmitContainer>
					</form>
				</PrimarySection>
				<SecondarySection>
					<span>
						{registerError && <ErrorText>{registerError}</ErrorText>}
						{errors?.usernameField?.message && <ErrorText>{errors.usernameField.message}</ErrorText>}
						{errors?.emailField?.message && <ErrorText>{errors.emailField.message}</ErrorText>}
						{errors?.passwordField?.message && <ErrorText>{errors.passwordField.message}</ErrorText>}
						{!errors?.usernameField?.message &&
							!errors?.emailField?.message &&
							!errors?.passwordField?.message &&
							!registerError && <ErrorText>&nbsp;</ErrorText>}
					</span>
				</SecondarySection>
				<SecondarySection>
					<p>
						Already have an account? <Link to="/login">Login here.</Link>
					</p>
					<p>
						Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
					</p>
					<p>
						Want to join a session without registering? <Link to="/join">Go for it!</Link>
					</p>
				</SecondarySection>
			</Page>
		</React.Fragment>
	)
}

export default Register
