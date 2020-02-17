import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import myFirebase from 'Service/Firebase'

const Join = () => {
	let history = useHistory()
	const [sessionId, setSessionId] = useState(null)
	const [isValid, setIsValid] = useState(false)
	const [sessionError, setSessionError] = useState(null)

	useEffect(() => {
		if (isValid) {
			history.push(`/session/${sessionId}`)
		}
	}, [isValid, sessionId, history])

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
				onSubmit={(values, { setSubmitting }) => {
					setSessionError(null)
					myFirebase
						.database()
						.ref(`sessions/${values.sessionId.toUpperCase()}`)
						.once('value')
						.then(snapshot => {
							if (snapshot.exists()) {
								setSessionId(values.sessionId.toUpperCase())
								setIsValid(true)
							} else {
								setSessionId(null)
								setIsValid(false)
								setSessionError('Session not found')
								setSubmitting(false)
							}
						})
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
