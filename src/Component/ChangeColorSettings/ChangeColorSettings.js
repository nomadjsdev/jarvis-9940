import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton, MessageButton, TimerButton } from 'jarvis9940-components'

import { setLocalColor } from 'Store/Feature/user'

import { ModalContainer, ModalContents } from 'Component/Global/Modal'
import { SubmitButton } from 'Component/Global/Form'

const ChangeColorSettings = ({ modalIsOpen }) => {
	const dispatch = useDispatch()
	const colorMode = useSelector(state => state.user.colorMode)

	const handleColorMode = mode => {
		dispatch(setLocalColor(mode))
	}

	return (
		<ModalContainer>
			<ModalContents>
				<h2>Colorblind mode</h2>
				<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
					<ToggleButton active={false} colorMode={colorMode} style={{ flexBasis: '50%' }}>
						Inactive
					</ToggleButton>
					<ToggleButton active={true} colorMode={colorMode} style={{ flexBasis: '50%' }}>
						Active
					</ToggleButton>
					<MessageButton colorMode={colorMode} style={{ flexBasis: '50%' }}>
						Message
					</MessageButton>
					<TimerButton colorMode={colorMode} style={{ flexBasis: '50%' }}>
						Timer
					</TimerButton>
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
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<SubmitButton
						type="button"
						onClick={() => {
							modalIsOpen(false)
						}}
					>
						Close
					</SubmitButton>
				</div>
			</ModalContents>
		</ModalContainer>
	)
}

export default ChangeColorSettings
