import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { loginUser } from 'Store/Feature/auth'

const Login = () => {
	const dispatch = useDispatch()
	const loginError = useSelector(state => state.auth.loginError)

	return (
		<>
			<h1>Login</h1>
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={values => {
					const errors = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address'
					}
					if (!values.password) {
						errors.password = 'Required'
					}
					return errors
				}}
				onSubmit={values => {
					dispatch(loginUser(values.email, values.password))
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="email">Email</label>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
						<label htmlFor="password">Password</label>
						<Field type="password" name="password" />
						<ErrorMessage name="password" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Login
						</button>
					</Form>
				)}
			</Formik>
			<div>
				{loginError && (
					<>
						<p>{loginError}</p>
					</>
				)}
			</div>
			<p>
				Don&apos;t have an account? <Link to="/register">Register here.</Link>
			</p>
			<p>
				Forgot your password? <Link to="/passwordreset">Reset it here.</Link>
			</p>
		</>
	)
}

export default Login
