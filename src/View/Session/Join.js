import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { joinSession } from 'Store/Feature/session'

const Join = () => {
	const dispatch = useDispatch()
	const sessionError = useSelector(state => state.session?.joinSessionError)
	const isValid = useSelector(state => state.session?.isValid)
	useEffect(() => {
		if (isValid) {
			// TODO: Redirect / forward to `session/${isValid}
		}
	}, [isValid])
	// TODO: get sessionId from state / param in case they were forwarded from an incorrect Session
	// TODO: reset form "isSubmitting" on joinError

	return (
		<>
			<h1>Join</h1>
			<Formik
				initialValues={{ sessionId: '' }}
				validate={values => {
					const errors = {}
					if (!values.sessionId) {
						errors.sessionId = 'Required'
					}
					return errors
				}}
				onSubmit={values => {
					dispatch(joinSession(values.sessionId))
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="sessionId">sessionId</label>
						<Field type="sessionId" name="sessionId" />
						<ErrorMessage name="sessionId" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Join session
						</button>
					</Form>
				)}
			</Formik>
			<div>
				{sessionError && (
					<>
						<p>{sessionError}</p>
					</>
				)}
			</div>
			<p>
				Want to create a new session instead? <Link to="/create">Go here!</Link>
			</p>
		</>
	)
}

export default Join
