import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { resetPassword } from 'Store/Feature/auth'

import { Page, PrimarySection, SecondarySection } from 'Component/Global/Layout'
import {
	SubmitContainer,
	SubmitButton,
	FieldContainer,
	FieldWarning,
	InputField,
	ErrorText,
} from 'Component/Global/Form'

const PasswordReset = () => {
	const dispatch = useDispatch()
	const resetError = useSelector(state => state.auth.resetError)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
	const [isSubmitting, setIsSubmitting] = React.useState(false)

	const onSubmit = data => {
		setIsSubmitting(true)
		const { emailField } = data
		dispatch(resetPassword(emailField))
		setIsSubmitting(false)
	}

	return (
		<React.Fragment>
			<h1>Password Reset</h1>
			<Page>
				<PrimarySection>
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>
							<label htmlFor="emailField">Enter your email</label>
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
						<SubmitContainer>
							<SubmitButton type="submit" disabled={isSubmitting}>
								Submit
							</SubmitButton>
						</SubmitContainer>
					</form>
				</PrimarySection>
				<SecondarySection>
					<span>
						{errors?.emailField?.message && <ErrorText>{errors.emailField.message}</ErrorText>}
						{resetError && <ErrorText>{resetError}</ErrorText>}
						{!errors?.emailField?.message && !resetError && <ErrorText>&nbsp;</ErrorText>}
					</span>
				</SecondarySection>
				<SecondarySection>
					<p>
						Don&apos;t have an account? <Link to="/register">Register here.</Link>
					</p>
					<p>
						Know your password? <Link to="/login">Login here.</Link>
					</p>
				</SecondarySection>
			</Page>
		</React.Fragment>
	)
}

export default PasswordReset
