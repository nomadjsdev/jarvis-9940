import React from 'react'

const SessionDetails = props => {
	const { gameName, activityName, sessionId } = props

	return (
		<div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
			<div style={{ flexBasis: '40%' }}>
				<p>{gameName}</p>
				<p>{activityName}</p>
			</div>
			<div style={{ flexBasis: '40%' }}>
				<p style={{ marginBottom: '0' }}>Session ID:</p>
				<p style={{ margin: 0, textAlign: 'right', fontSize: '2em' }}>{sessionId}</p>
			</div>
		</div>
	)
}

export default SessionDetails
