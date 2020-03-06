import React from 'react'

const MessageDisplay = props => {
	const { displayMessage, encounterName } = props

	return (
		<div
			style={{
				width: '100%',
				border: '1px solid white',
				borderRadius: '5px',
				textAlign: 'center',
				margin: '10px 0',
			}}
		>
			{displayMessage && <h3 style={{ margin: '0.75em' }}>{displayMessage}</h3>}
			{!displayMessage && <h3 style={{ margin: '0.75em' }}>{encounterName}</h3>}
		</div>
	)
}

export default MessageDisplay
