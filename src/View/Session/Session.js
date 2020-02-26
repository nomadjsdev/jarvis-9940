import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToggleButton, MessageButton, TimerButton, ButtonGroup } from 'jarvis9940-components'

import myFirebase from 'Service/Firebase'

import LocalUsernameForm from 'Component/LocalUsernameForm'
import { ModalContainer, ModalContents } from 'Component/Global/Modal'
import { LoadingContainer, LoadingIcon } from 'Component/Global/Loading'
import { colors } from 'Styles'

import useBreakpoint from 'Hook/useBreakpoint'

const Session = () => {
	const breakpoint = useBreakpoint()
	// TODO: Cache static values like activity / encounter / game name
	// TODO: ButtonGroup functions
	// TODO / FIXME: SO MANY RENDERS
	// TODO / FIXME: Too many useEffects fetching data in sequence
	// TODO: Setup multiple websocket connections for data / chat etc
	const { sessionId } = useParams()
	const isAuthenticated = useSelector(state => state.auth?.isAuthenticated)
	const localUsername = useSelector(state => state.user?.localUsername)
	const colorMode = useSelector(state => state.user?.colorMode)

	if (!isAuthenticated && !localUsername) {
		return <LocalUsernameForm />
	}

	const uid = useSelector(state => state.auth?.user?.uid)
	const username = useSelector(state => state.user?.details?.username)

	// FIXME: setIsLoading() is not working as intended
	const [isLoading, setIsLoading] = useState(true)
	const [isValid, setIsValid] = useState(false)
	const [changeEncounter, setChangeEncounter] = useState(false)

	const [activityVal, setActivityVal] = useState(null)
	const [activityName, setActivityName] = useState(null)
	const [activityEncounters, setActivityEncounters] = useState(null)
	const [encounterTemplates, setEncounterTemplates] = useState(null)
	const [encounterVal, setEncounterVal] = useState(null)
	const [encounterName, setEncounterName] = useState(null)
	const [encounters, setEncounters] = useState(null)
	const [gameVal, setGameVal] = useState(null)
	const [gameName, setGameName] = useState(null)
	const [layoutVal, setLayoutVal] = useState(null)
	const [messageVal, setMessageVal] = useState(null)
	const [displayMessage, setDisplayMessage] = useState(null)
	const [readyCheckVal, setReadyCheckVal] = useState(null)
	const [ownerIdVal, setOwnerIdVal] = useState(null)

	const [sessionError, setSessionError] = useState(null)

	// Preserve interval across renders
	let messageTimer = useRef()

	useEffect(() => {
		if (gameVal && activityVal) {
			setIsLoading(true)
			// Fetch activity encounters
			myFirebase
				.database()
				.ref(`activityEncounters/${activityVal}`)
				.once('value')
				.then(snapshot => {
					setActivityEncounters(snapshot.val())
				})
				.catch(error => {
					setSessionError(error.message)
				})
			setIsLoading(false)
		}
	}, [gameVal, activityVal])

	useEffect(() => {
		const run = async () => {
			setIsLoading(true)
			// Fetch encounter templates
			let templateObject
			let encounterObject
			for (let encounter of activityEncounters) {
				const encounterVal = await myFirebase
					.database()
					.ref(`encounters/${encounter}`)
					.once('value')
					.then(snapshot => snapshot.val())
				if (encounterVal) {
					encounterObject = { ...encounterObject, [encounter]: { name: encounterVal.name } }
				}

				const template = await myFirebase
					.database()
					.ref(`encounterTemplates/${encounter}`)
					.once('value')
					.then(snapshot => snapshot.val())

				if (template) {
					templateObject = { ...templateObject, [encounter]: template }
				}
			}
			setEncounters(encounterObject)
			setEncounterTemplates(templateObject)
			setIsLoading(false)
		}

		if (activityEncounters) {
			run()
		}
	}, [activityEncounters])

	useEffect(() => {
		let firebaseRef = myFirebase.database().ref(`sessions/${sessionId.toUpperCase()}`)
		let listener
		if (sessionId) {
			listener = firebaseRef.on('value', snapshot => {
				if (snapshot.exists()) {
					// TODO: `created timestamp` check
					setIsLoading(false)
					setIsValid(true)
					const { activity, encounter, game, layout, message, readyCheck, startTimer, ownerId } = snapshot.val()
					setActivityVal(activity)
					setEncounterVal(encounter)
					setGameVal(game)
					setLayoutVal(layout)
					setMessageVal(message)
					setReadyCheckVal(readyCheck)
					setOwnerIdVal(ownerId)
				} else {
					setIsLoading(false)
					setIsValid(false)
					setActivityVal(null)
					setEncounterVal(null)
					setGameVal(null)
					setLayoutVal(null)
					setMessageVal(null)
					setReadyCheckVal(null)
					setOwnerIdVal(null)
				}
			})
		}

		return () => firebaseRef.off('value', listener)
	}, [sessionId])

	useEffect(() => {
		if (activityVal) {
			setIsLoading(true)
			myFirebase
				.database()
				.ref(`activities/${activityVal}`)
				.once('value')
				.then(snapshot => {
					setActivityName(snapshot.val().name)
					setIsLoading(false)
				})
		}
	}, [activityVal])

	useEffect(() => {
		if (encounterVal) {
			setIsLoading(true)
			myFirebase
				.database()
				.ref(`encounters/${encounterVal}`)
				.once('value')
				.then(snapshot => {
					setEncounterName(snapshot.val().name)
					setIsLoading(false)
				})
		}
	}, [encounterVal])

	useEffect(() => {
		if (gameVal) {
			setIsLoading(true)
			myFirebase
				.database()
				.ref(`games/${gameVal}`)
				.once('value')
				.then(snapshot => {
					setGameName(snapshot.val().name)
					setIsLoading(false)
				})
		}
	}, [gameVal])

	const handleChangeEncounter = encounterId => {
		clearInterval(messageTimer.current)

		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ message: '', encounter: encounterId })
	}

	const handleReadyCheck = checkActive => {
		clearInterval(messageTimer.current)

		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ message: '', readyCheck: { active: checkActive } })
	}

	const submitReadyCheck = (playerId, status) => {
		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ readyCheck: { ...readyCheckVal, players: { ...readyCheckVal.players, [playerId]: status } } })
	}

	const handleReset = () => {
		clearInterval(messageTimer.current)

		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({
				message: '',
			})
		// TODO: Reset button states?
	}

	const handleToggle = buttonId => {
		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ layout: { ...layoutVal, [buttonId]: !layoutVal[buttonId] } })
	}

	const handleMessage = message => {
		clearInterval(messageTimer.current)

		// TODO: Disable buttons on wipe?
		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ message: [{ text: message, time: 0 }] })
	}

	const handleTimer = messages => {
		clearInterval(messageTimer.current)

		let timestamp = Math.floor(Date.now() / 1000)

		let messageArray = []
		for (let element of messages) {
			timestamp = timestamp + element.time
			messageArray.push({ text: element.message, time: timestamp, showTime: element.showTime })
		}

		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({
				message: messageArray,
			})
	}

	const handleGroup = itemId => {
		return buttonId => {
			myFirebase
				.database()
				.ref(`sessions/${sessionId}`)
				.update({
					layout: { ...layoutVal, [itemId]: buttonId === 'reset' ? false : buttonId },
				})
		}
	}

	useEffect(() => {
		if (messageVal || messageVal === '') {
			if (messageVal === '') {
				setDisplayMessage(null)
				clearInterval(messageTimer.current)
			} else {
				// Quick loop through message array to see if any are still valid
				// otherwise this would run through the setInterval over several seconds
				for (const message of messageVal) {
					const timeNow = Math.floor(Date.now() / 1000)
					if (message.time >= timeNow || message.time == 0) {
						setDisplayMessage(`${message.text}${message.showTime ? ` ${message.time - timeNow}` : ''}`)
						break
					}
				}

				if (messageVal[0].time !== 0) {
					let i = 0
					const j = messageVal.length
					messageTimer.current = setInterval(() => {
						if (i === j) {
							clearInterval(messageTimer.current)
							setDisplayMessage(null)
						} else {
							const difference = messageVal[i].time - Math.floor(Date.now() / 1000)
							if (difference > 0) {
								setDisplayMessage(`${messageVal[i].text}${messageVal[i].showTime ? ` ${difference}` : ''}`)
							}
							if (difference == 1) {
								i = i + 1
							}
						}
					}, 1000)
				}
			}
		}
	}, [messageVal])

	if (isLoading) {
		return (
			<React.Fragment>
				<LoadingContainer>
					<LoadingIcon />
				</LoadingContainer>
			</React.Fragment>
		)
	}

	if (sessionId && !isValid && !isLoading) {
		return (
			<React.Fragment>
				<h1>Session ID isn't valid</h1>
			</React.Fragment>
		)
	}

	if (!sessionId) {
		return (
			<React.Fragment>
				<h1>Session ID is required</h1>
				<p>
					<Link to="/join">Join an existing session</Link>
				</p>
				<p>or</p>
				{isAuthenticated && (
					<React.Fragment>
						<p>
							<Link to="/create">Create a new session</Link>
						</p>
					</React.Fragment>
				)}
				{!isAuthenticated && (
					<React.Fragment>
						<p>
							<Link to="/login">login</Link> to create a new session
						</p>
						<p>
							No account? <Link to="/register">Register now to create sessions</Link>
						</p>
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{readyCheckVal && readyCheckVal.active && (
				<ModalContainer>
					<ModalContents>
						<h3>Readycheck modal</h3>
						{readyCheckVal.players && (
							<div>
								{Object.keys(readyCheckVal.players).map(player => (
									<div key={player}>
										<p style={{ color: readyCheckVal.players[player] ? 'green' : 'red' }}>{player}</p>
									</div>
								))}
							</div>
						)}
						<div>
							<button
								type="button"
								onClick={() => {
									submitReadyCheck(username ? username : localUsername, true)
								}}
							>
								Ready
							</button>
							<button
								type="button"
								onClick={() => {
									submitReadyCheck(username ? username : localUsername, false)
								}}
							>
								Not ready
							</button>
						</div>
						{uid === ownerIdVal && (
							<div>
								<button
									type="button"
									onClick={() => {
										handleReadyCheck(false)
									}}
								>
									Close readycheck
								</button>
							</div>
						)}
					</ModalContents>
				</ModalContainer>
			)}
			{changeEncounter && (
				<ModalContainer>
					<ModalContents>
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
					</ModalContents>
				</ModalContainer>
			)}
			<div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
				<div style={{ flexBasis: '40%' }}>
					<p>{gameName}</p>
					<p>{activityName}</p>
				</div>
				<div style={{ flexBasis: '40%' }}>
					<p>Session ID:</p>
					<p>{sessionId}</p>
				</div>
			</div>
			{uid === ownerIdVal && (
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
					{uid === ownerIdVal && (
						<div style={{ marginTop: '10px' }}>
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
					)}
				</div>
			)}
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
			<div>
				{encounterVal && !encounterTemplates && (
					<React.Fragment>
						<h3>Loading templates</h3>
					</React.Fragment>
				)}
				{encounterVal && encounterTemplates && !encounterTemplates[encounterVal] && (
					<React.Fragment>
						<h3>No template found for {encounterName}</h3>
					</React.Fragment>
				)}
				{encounterVal && encounterTemplates?.[encounterVal] && (
					<React.Fragment>
						<div
							style={{
								width: '100%',
							}}
						>
							{encounterTemplates[encounterVal].map((row, rowIndex) => {
								return (
									<div
										key={rowIndex}
										style={{
											display: 'flex',
											flexFlow: 'row nowrap',
											justifyContent: 'space-between',
										}}
									>
										{row.map((col, colIndex) => {
											return (
												<div
													key={colIndex}
													style={{
														display: 'flex',
														flexFlow: 'column nowrap',
														flexGrow: '1',
													}}
												>
													{col.map(item => {
														if (item.type === 'group') {
															return (
																<React.Fragment key={item.id}>
																	<ButtonGroup
																		size={breakpoint}
																		orientation={item.direction}
																		colorMode={colorMode}
																		alignment={item.alignment}
																		buttons={item.buttons}
																		active={layoutVal[item.id] || ''}
																		click={handleGroup(item.id)}
																	/>
																</React.Fragment>
															)
														}

														if (item.type === 'message') {
															return (
																<React.Fragment key={item.id}>
																	<MessageButton
																		size={breakpoint}
																		colorMode={colorMode}
																		alignment={item.alignment}
																		onClick={() => {
																			handleMessage(item.message)
																		}}
																	>
																		{item.text}
																	</MessageButton>
																</React.Fragment>
															)
														}

														if (item.type === 'timer') {
															return (
																<React.Fragment key={item.id}>
																	<TimerButton
																		size={breakpoint}
																		colorMode={colorMode}
																		alignment={item.alignment}
																		onClick={() => {
																			handleTimer([
																				{ message: item.message, time: item.time, showTime: item.showTime ?? false },
																			])
																		}}
																	>
																		{item.text}
																	</TimerButton>
																</React.Fragment>
															)
														}

														return (
															<React.Fragment key={item.id}>
																<ToggleButton
																	id={item.id}
																	size={breakpoint}
																	active={layoutVal[item.id]}
																	colorMode={colorMode}
																	alignment={item.alignment}
																	onClick={() => {
																		handleToggle(item.id)
																	}}
																>
																	{item.text}
																</ToggleButton>
															</React.Fragment>
														)
													})}
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					</React.Fragment>
				)}
			</div>
			{sessionError && <div>{sessionError}</div>}
		</React.Fragment>
	)
}

export default Session
