import React from 'react'

import { colors } from 'Styles'

const AdminControls = props => {
	const { setChangeEncounter, handleTimer, handleReset, handleMessage, handleReadyCheck } = props

	return (
		<React.Fragment>
			<div style={{ margin: '10px 0' }}>
				<button
					type="button"
					style={{
						border: '1px solid white',
						borderRadius: '10px',
						padding: '7px 15px',
						width: '100%',
						color: colors.primaryText,
						backgroundColor: colors.background,
					}}
					onClick={() => {
						setChangeEncounter(true)
					}}
				>
					Change encounter
				</button>
			</div>
			<div style={{ width: '100%' }}>
				<div style={{ display: 'flex', flexFlow: 'row nowrap', marginBottom: '10px' }}>
					<div style={{ flexBasis: '50%' }}>
						<button
							type="button"
							style={{
								border: '1px solid white',
								borderRadius: '10px',
								padding: '7px 15px',
								width: '100%',
								backgroundColor: colors.green,
							}}
							onClick={() => {
								handleTimer([
									{ message: 'Start in', time: 5, showTime: true },
									{ message: 'GO!', time: 5, showTime: false },
								])
							}}
						>
							Start
						</button>
					</div>
					<div style={{ flexBasis: '50%' }}>
						<button
							type="button"
							style={{
								border: '1px solid white',
								borderRadius: '10px',
								padding: '7px 15px',
								width: '100%',
								backgroundColor: colors.yellow,
							}}
							onClick={() => {
								handleReset()
							}}
						>
							Reset
						</button>
					</div>
				</div>
				<div style={{ display: 'flex', flexFlow: 'row nowrap', marginTop: '10px' }}>
					<div style={{ flexBasis: '50%' }}>
						<button
							type="button"
							style={{
								border: '1px solid white',
								borderRadius: '10px',
								padding: '7px 15px',
								width: '100%',
								color: colors.primaryText,
								backgroundColor: colors.red,
							}}
							onClick={() => {
								handleMessage('WIPE!')
							}}
						>
							Wipe
						</button>
					</div>
					<div style={{ flexBasis: '50%' }}>
						<button
							type="button"
							style={{
								border: '1px solid white',
								borderRadius: '10px',
								padding: '7px 15px',
								width: '100%',
								color: colors.primaryText,
								backgroundColor: colors.blue,
							}}
							onClick={() => {
								handleReadyCheck(true)
							}}
						>
							Ready check
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default AdminControls
