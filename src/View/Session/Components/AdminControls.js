import React from 'react'
import styled from 'styled-components'

import { colors } from 'Styles'

const Row = styled.div`
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 10px;
`

const Col = styled.div`
	flex-basis: 50%;
`

const Button = styled.button`
	border: 1px solid white;
	border-radius: 10px;
	padding: 7px 15px;
	width: 100%;
	color: ${props => props.color};
	background-color: ${props => props.background};
`

const AdminControls = props => {
	const { setChangeEncounter, handleTimer, handleReset, handleMessage, handleReadyCheck } = props

	return (
		<React.Fragment>
			<div style={{ margin: '10px 0' }}>
				<Button
					type="button"
					color={colors.primaryText}
					background={colors.background}
					onClick={() => {
						setChangeEncounter(true)
					}}
				>
					Change encounter
				</Button>
			</div>
			<div style={{ width: '100%' }}>
				<Row>
					<Col>
						<Button
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
						</Button>
					</Col>
					<Col>
						<Button
							type="button"
							color={colors.background}
							background={colors.yellow}
							onClick={() => {
								handleReset()
							}}
						>
							Reset
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button
							type="button"
							color={colors.primaryText}
							background={colors.red}
							onClick={() => {
								handleMessage('WIPE!')
							}}
						>
							Wipe
						</Button>
					</Col>
					<Col>
						<Button
							type="button"
							color={colors.primaryText}
							background={colors.blue}
							onClick={() => {
								handleReadyCheck(true)
							}}
						>
							Ready check
						</Button>
					</Col>
				</Row>
			</div>
		</React.Fragment>
	)
}

export default AdminControls
