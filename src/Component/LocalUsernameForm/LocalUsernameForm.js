import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { setLocalUsername } from 'Store/Feature/user'

import Modal from 'Component/Global/Modal'
import { SubmitContainer, SubmitButton, FieldContainer, FieldWarning, InputField } from 'Component/Global/Form'

const LocalUsername = ({ modalIsOpen }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const [isSubmitting, setIsSubmitting] = React.useState(false)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	const usernameSubmit = data => {
		setIsSubmitting(true)
		const { usernameField } = data
		dispatch(setLocalUsername(usernameField))
	}

	const handleCancel = () => {
		if (modalIsOpen) {
			modalIsOpen(false)
		} else {
			history.push('/')
		}
	}

	return (
		<Modal>
			<h2>Choose a temporary username</h2>
			<form onSubmit={handleSubmit(usernameSubmit)}>
				<p>
					<label htmlFor="usernameField">Username</label>
				</p>
				<FieldContainer>
					<InputField
						type="text"
						id="usernameField"
						name="usernameField"
						ref={register({
							required: { value: true, message: 'Username is required' },
							minLength: { value: 2, message: 'Username should be between 2 and 16 characters' },
							maxLength: { value: 16, message: 'Username should be between 2 and 16 characters' },
						})}
					/>
					{errors?.usernameField?.message && <FieldWarning>!!</FieldWarning>}
				</FieldContainer>
				<SubmitContainer>
					<SubmitButton
						type="button"
						onClick={() => {
							handleCancel()
						}}
					>
						Cancel
					</SubmitButton>
					<SubmitButton type="submit" disabled={isSubmitting}>
						Submit
					</SubmitButton>
				</SubmitContainer>
			</form>
			<p>
				Want to create a new session instead?{' '}
				{isAuthenticated ? <Link to="/create">Start here!</Link> : <Link to="/register">Register now!</Link>}
			</p>
		</Modal>
	)
}

export default LocalUsername
