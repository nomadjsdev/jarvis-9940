import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { loginUser } from 'Store/Feature/auth'

import { Page, PrimarySection, SecondarySection } from 'Component/Global/Layout'
import {
	SubmitContainer,
	SubmitButton,
	FieldContainer,
	FieldWarning,
	InputField,
	ErrorText,
} from 'Component/Global/Form'

const Login = () => {
	const dispatch = useDispatch()
	const loginError = useSelector(state => state.auth.loginError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	const [isSubmitting, setIsSubmitting] = React.useState(false)
	const [viewPassword, setViewPassword] = React.useState(false)

	React.useEffect(() => {
		setIsSubmitting(false)
	}, [loginError])

	const onSubmit = data => {
		const { emailField, passwordField } = data
		setIsSubmitting(true)
		dispatch(loginUser(emailField, passwordField))
	}

	return (
		<React.Fragment>
			<h1>Login</h1>
			<Page>
				<PrimarySection>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="emailField">Email address</label>
						</p>
						<FieldContainer>
							<InputField
								type="email"
								id="emailField"
								name="emailField"
								ref={register({
									required: { value: true, message: 'Email is required' },
								})}
							/>
							{errors?.emailField?.message && <FieldWarning>!!</FieldWarning>}
						</FieldContainer>
						<p>
							<label htmlFor="passwordField">Password</label>
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
							{isSubmitting && <p>Logging in...</p>}
							<SubmitButton type="submit" disabled={isSubmitting}>
								Login
							</SubmitButton>
						</SubmitContainer>
					</form>
				</PrimarySection>
				<SecondarySection>
					<ErrorText>
						{errors?.emailField?.message && <span>{errors.emailField.message}</span>}
						{errors?.passwordField?.message && <span>{errors.passwordField.message}</span>}
						{loginError && <span>{loginError}</span>}
						{!errors?.emailField?.message && !errors?.passwordField?.message && !loginError && <span>&nbsp;</span>}
					</ErrorText>
				</SecondarySection>
				<SecondarySection>
					<p>
						Don&apos;t have an account? <Link to="/register">Register here.</Link>
					</p>
					<p>
						Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
					</p>
				</SecondarySection>
			</Page>
		</React.Fragment>
	)
}

export default Login
