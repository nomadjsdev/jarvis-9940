import React from 'react'

import Modal from 'Component/Global/Modal'

import { colors } from 'Styles'

const ChangeEncounter = props => {
	const { activityEncounters, setChangeEncounter, handleChangeEncounter, encounters } = props

	return (
		<Modal>
			<h3 style={{ textAlign: 'center' }}>Change encounter</h3>
			<div>
				{activityEncounters.map(encounter => (
					<button
						key={encounter}
						type="button"
						style={{ border: '1px solid white', borderRadius: '10px', padding: '7px 15px', margin: '10px' }}
						onClick={() => {
							setChangeEncounter(false)
							handleChangeEncounter(encounter)
						}}
					>
						{encounters[encounter].name}
					</button>
				))}
			</div>
			<button
				type="button"
				style={{
					border: '1px solid white',
					borderRadius: '10px',
					padding: '7px 15px',
					margin: '10px',
					backgroundColor: colors.red,
				}}
				onClick={() => {
					setChangeEncounter(false)
				}}
			>
				Cancel
			</button>
		</Modal>
	)
}

export default ChangeEncounter
