import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { resetPassword } from 'Store/Feature/auth'

import { SubmitButton, FieldContainer, FieldWarning } from 'Component/Global/Form'

// TODO: Remove this from redux, handle locally

const PasswordReset = () => {
	const dispatch = useDispatch()
	const resetError = useSelector(state => state.auth.resetError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = data => {
		setIsSubmitting(true)
		const { emailField } = data
		dispatch(resetPassword(emailField))
		setIsSubmitting(false)
	}

	return (
		<React.Fragment>
			<h1>Password Reset</h1>
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
				<div style={{ flex: '0 0 30%' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="emailField">Enter your email</label>
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
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<SubmitButton type="submit" disabled={isSubmitting}>
								Submit
							</SubmitButton>
						</div>
					</form>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p style={{ color: 'red', fontWeight: 'bold' }}>
						{errors?.emailField?.message && <span>{errors.emailField.message}</span>}
						{resetError && <span>{resetError}</span>}
						{!errors?.emailField?.message && !resetError && <span>&nbsp;</span>}
					</p>
				</div>
				<div style={{ flex: '1 0 30%' }}>
					<p>
						Don&apos;t have an account? <Link to="/register">Register here.</Link>
					</p>
					<p>
						Know your password? <Link to="/login">Login here.</Link>
					</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default PasswordReset
