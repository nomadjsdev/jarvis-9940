import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
`

const Col = styled.div`
	flex-basis: 40%;
`

const SessionDetails = props => {
	const { gameName, activityName, sessionId } = props

	return (
		<Container>
			<Col>
				<p>{gameName}</p>
				<p>{activityName}</p>
			</Col>
			<Col>
				<p style={{ marginBottom: '0' }}>Session ID:</p>
				<p style={{ margin: 0, textAlign: 'right', fontSize: '2em' }}>{sessionId}</p>
			</Col>
		</Container>
	)
}

export default SessionDetails
