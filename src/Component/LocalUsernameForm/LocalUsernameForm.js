import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { setLocalUsername } from 'Store/Feature/user'

import { ModalContainer, ModalContents } from 'Component/Global/Modal'
import { SubmitButton, FieldContainer, FieldWarning } from 'Component/Global/Form'

const LocalUsername = ({ modalIsOpen }) => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

	const usernameSubmit = data => {
		setIsSubmitting(true)
		const { usernameField } = data
		dispatch(setLocalUsername(usernameField))
	}

	return (
		<ModalContainer>
			<ModalContents>
				<h2>Choose a temporary username</h2>
				<form onSubmit={handleSubmit(usernameSubmit)}>
					<p>
						<label htmlFor="usernameField">Username</label>
					</p>
					<FieldContainer>
						<input
							type="text"
							id="usernameField"
							name="usernameField"
							style={{ width: '100%', height: '30px' }}
							ref={register({
								required: { value: true, message: 'Username is required' },
								minLength: { value: 2, message: 'Username should be between 2 and 16 characters' },
								maxLength: { value: 16, message: 'Username should be between 2 and 16 characters' },
							})}
						/>
						{errors?.usernameField?.message && <FieldWarning>!!</FieldWarning>}
					</FieldContainer>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<SubmitButton
							type="button"
							onClick={() => {
								modalIsOpen(false)
							}}
						>
							Cancel
						</SubmitButton>
						<SubmitButton type="submit" disabled={isSubmitting}>
							Submit
						</SubmitButton>
					</div>
				</form>
				<p>
					Want to create a new session instead?{' '}
					{isAuthenticated ? <Link to="/create">Start here!</Link> : <Link to="/register">Register now!</Link>}
				</p>
			</ModalContents>
		</ModalContainer>
	)
}

export default LocalUsername
