import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { resetPassword } from 'Store/Feature/auth'

const PasswordReset = () => {
	const dispatch = useDispatch()
	const resetError = useSelector(state => state.auth.resetError)

	return (
		<>
			<h1>PasswordReset</h1>
			<Formik
				initialValues={{ email: '' }}
				validate={values => {
					const errors = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address'
					}
					return errors
				}}
				onSubmit={values => {
					dispatch(resetPassword(values.email))
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="email">Email</label>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Reset
						</button>
					</Form>
				)}
			</Formik>
			<div>
				{resetError && (
					<>
						<p>{resetError}</p>
					</>
				)}
			</div>
			<p>
				Don&apos;t have an account? <Link to="/register">Register here.</Link>
			</p>
			<p>
				Know your password? <Link to="/login">Login here.</Link>
			</p>
		</>
	)
}

export default PasswordReset
