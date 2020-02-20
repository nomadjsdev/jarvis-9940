import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
// import { Formik, Form, Field, ErrorMessage } from 'formik'

import { loginUser } from 'Store/Feature/auth'

import { SubmitButton, FieldContainer, FieldWarning } from 'Component/Global/Form'

const Login = () => {
	const dispatch = useDispatch()
	const loginError = useSelector(state => state.auth.loginError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [viewPassword, setViewPassword] = useState(false)

	const onSubmit = data => {
		const { emailField, passwordField } = data
		setIsSubmitting(true)
		dispatch(loginUser(emailField, passwordField))
	}

	return (
		<React.Fragment>
			<h1>Login</h1>
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
				<div style={{ flex: '0 0 30%' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="emailField">Email address</label>
						</p>
						<FieldContainer>
							<input
								type="email"
								id="emailField"
								name="emailField"
								style={{ width: '100%', height: '30px' }}
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
							<input
								type={viewPassword ? 'text' : 'password'}
								id="passwordField"
								name="passwordField"
								style={{ width: '100%', height: '30px' }}
								ref={register({
									required: { value: true, message: 'Password is required' },
								})}
							/>
							{errors?.passwordField?.message && <FieldWarning>!!</FieldWarning>}
						</FieldContainer>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<SubmitButton type="submit" disabled={isSubmitting}>
								Login
							</SubmitButton>
						</div>
					</form>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p style={{ color: 'red', fontWeight: 'bold' }}>
						{errors?.emailField?.message && <span>{errors.emailField.message}</span>}
						{errors?.passwordField?.message && <span>{errors.passwordField.message}</span>}
						{loginError && <span>{loginError}</span>}
						{!errors?.emailField?.message && !errors?.passwordField?.message && !loginError && <span>&nbsp;</span>}
					</p>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p>
						Don&apos;t have an account? <Link to="/register">Register here.</Link>
					</p>
					<p>
						Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
					</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Login
