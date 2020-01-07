import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { registerUser } from 'Store/Feature/auth'

const Register = () => {
	const dispatch = useDispatch()
	const registerError = useSelector(state => state.auth.registerError)

	return (
		<>
			<h1>Register</h1>
			<Formik
				initialValues={{ email: '', password1: '', password2: '' }}
				validate={values => {
					const errors = {}
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
					dispatch(registerUser(values.email, values.password1))
				}}
			>
				{({ isSubmitting }) => (
					<Form>
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
			</Formik>
			<div>
				{registerError && (
					<>
						<p>{registerError}</p>
					</>
				)}
			</div>
			<p>
				Already have an account? <Link to="/login">Login here.</Link>
			</p>
			<p>
				Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
			</p>
		</>
	)
}

export default Register
