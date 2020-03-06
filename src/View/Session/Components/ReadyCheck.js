import React from 'react'
import { ToggleButton } from 'jarvis9940-components'

import Modal from 'Component/Global/Modal'

const ReadyCheck = props => {
	const {
		readyCheckVal,
		handleReadyCheck,
		submitReadyCheck,
		username,
		localUsername,
		uid,
		ownerIdVal,
		colorMode,
	} = props

	return (
		<Modal>
			<h3 style={{ textAlign: 'center' }}>Readycheck!</h3>
			{readyCheckVal.players && (
				<div>
					{Object.keys(readyCheckVal.players).map(player => (
						<div key={player}>
							{readyCheckVal.players[player] ? (
								<p style={{ color: 'green' }}>{player} ready</p>
							) : (
								<p style={{ color: 'red' }}>{player} not ready</p>
							)}
						</div>
					))}
				</div>
			)}
			<div>
				<ToggleButton
					active={
						(username && readyCheckVal.players?.[username]) || (localUsername && readyCheckVal.players?.[localUsername])
					}
					colorMode={colorMode}
					onClick={() => {
						submitReadyCheck(username ? username : localUsername, true)
					}}
				>
					Ready
				</ToggleButton>
				<ToggleButton
					active={
						readyCheckVal.players &&
						((username && readyCheckVal.players[username] !== undefined && !readyCheckVal.players[username]) ||
							(localUsername &&
								readyCheckVal.players[localUsername] !== undefined &&
								!readyCheckVal.players[localUsername]))
					}
					colorMode={colorMode}
					onClick={() => {
						submitReadyCheck(username ? username : localUsername, false)
					}}
				>
					Not ready
				</ToggleButton>
			</div>
			{uid === ownerIdVal && (
				<div>
					<button
						type="button"
						style={{
							border: '1px solid white',
							borderRadius: '10px',
							padding: '7px 15px',
							margin: '10px',
						}}
						onClick={() => {
							handleReadyCheck(false)
						}}
					>
						Close readycheck
					</button>
				</div>
			)}
		</Modal>
	)
}

export default ReadyCheck
