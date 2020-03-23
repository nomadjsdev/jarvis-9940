import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ToggleButton, MessageButton, TimerButton } from 'jarvis9940-components'

import { setLocalColor } from 'Store/Feature/user'

import Modal from 'Component/Global/Modal'
import { SubmitContainer, SubmitButton } from 'Component/Global/Form'

const ButtonContainer = styled.div`
	flex-basis: 50%;
`

const ChangeColorSettings = ({ modalIsOpen }) => {
	const dispatch = useDispatch()
	const colorMode = useSelector(state => state.user.colorMode)

	const handleColorMode = mode => {
		dispatch(setLocalColor(mode))
	}

	return (
		<Modal>
			<h2>Colorblind mode</h2>
			<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
				<ButtonContainer>
					<ToggleButton active={false} colorMode={colorMode}>
						Inactive
					</ToggleButton>
				</ButtonContainer>
				<ButtonContainer>
					<ToggleButton active={true} colorMode={colorMode}>
						Active
					</ToggleButton>
				</ButtonContainer>
				<ButtonContainer>
					<MessageButton colorMode={colorMode}>Message</MessageButton>
				</ButtonContainer>
				<ButtonContainer>
					<TimerButton colorMode={colorMode}>Timer</TimerButton>
				</ButtonContainer>
			</div>
			<div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
				<SubmitButton
					type="button"
					active={colorMode === 'off' || colorMode === undefined || colorMode === null}
					onClick={() => {
						handleColorMode('off')
					}}
				>
					Off (default)
				</SubmitButton>
				<SubmitButton
					type="button"
					active={colorMode === 'deut'}
					onClick={() => {
						handleColorMode('deut')
					}}
				>
					Deuteranopia
				</SubmitButton>
				<SubmitButton
					type="button"
					active={colorMode === 'prot'}
					onClick={() => {
						handleColorMode('prot')
					}}
				>
					Protanopia
				</SubmitButton>
				<SubmitButton
					type="button"
					active={colorMode === 'tri'}
					onClick={() => {
						handleColorMode('tri')
					}}
				>
					Tritanopia
				</SubmitButton>
				<SubmitButton
					type="button"
					active={colorMode === 'mono'}
					onClick={() => {
						handleColorMode('mono')
					}}
				>
					Monochromacy
				</SubmitButton>
			</div>
			<SubmitContainer>
				<SubmitButton
					type="button"
					onClick={() => {
						modalIsOpen(false)
					}}
				>
					Close
				</SubmitButton>
			</SubmitContainer>
		</Modal>
	)
}

export default ChangeColorSettings
