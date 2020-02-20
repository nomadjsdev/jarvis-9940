import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
// import { Formik, Form, Field, ErrorMessage } from 'formik'

import { registerUser } from 'Store/Feature/auth'

import { SubmitButton, FieldContainer, FieldWarning } from 'Component/Global/Form'

const Register = () => {
	const dispatch = useDispatch()
	const registerError = useSelector(state => state.auth.registerError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [viewPassword, setViewPassword] = useState(false)

	const onSubmit = data => {
		setIsSubmitting(true)
		const { usernameField, emailField, passwordField } = data
		dispatch(registerUser(emailField, passwordField, usernameField))
	}

	return (
		<React.Fragment>
			<h1>Register</h1>
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
				<div style={{ flex: '0 0 30%' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="usernameField">Choose a username</label>
						</p>
						<FieldContainer>
							<input
								type="text"
								id="usernameField"
								name="usernameField"
								style={{ width: '100%', height: '30px' }}
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
							<input
								type="email"
								id="emailField"
								name="emailField"
								style={{ width: '100%', height: '30px' }}
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
								Join
							</SubmitButton>
						</div>
					</form>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p style={{ color: 'red', fontWeight: 'bold' }}>
						{registerError && <span>{registerError}</span>}
						{errors?.usernameField?.message && <span>{errors.usernameField.message}</span>}
						{errors?.emailField?.message && <span>{errors.emailField.message}</span>}
						{errors?.passwordField?.message && <span>{errors.passwordField.message}</span>}
						{!errors?.usernameField?.message &&
							!errors?.emailField?.message &&
							!errors?.passwordField?.message &&
							!registerError && <span>&nbsp;</span>}
					</p>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p>
						Already have an account? <Link to="/login">Login here.</Link>
					</p>
					<p>
						Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
					</p>
					<p>
						Want to join a session without registering? <Link to="/join">Go for it!</Link>
					</p>
				</div>
			</div>

			{/* <Formik
				initialValues={{ username: '', email: '', password1: '', password2: '' }}
				validate={values => {
					const errors = {}
					if (!values.username) {
						errors.username = 'Required'
					}
					if (!values.email) {
						errors.email = 'Required'
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address'
					}
					if (!values.password1) {
						errors.password1 = 'Required'
					}
					if (!values.password2) {
						errors.password2 = 'Required'
					}
					if (values.password1 !== values.password2) {
						errors.password2 = 'Passwords do not match'
					}
					return errors
				}}
				onSubmit={values => {
					dispatch(registerUser(values.email, values.password1, values.username))
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="username">Username</label>
						<Field type="username" name="username" />
						<ErrorMessage name="username" component="div" />
						<label htmlFor="email">Email</label>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
						<label htmlFor="password1">Password</label>
						<Field type="password" name="password1" />
						<ErrorMessage name="password1" component="div" />
						<label htmlFor="password2">Repeat password</label>
						<Field type="password" name="password2" />
						<ErrorMessage name="password2" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Register
						</button>
					</Form>
				)}
			</Formik> */}
		</React.Fragment>
	)
}

export default Register
