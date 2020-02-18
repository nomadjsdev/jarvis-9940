import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToggleButton, MessageButton, TimerButton, ButtonGroup } from 'jarvis9940-components'

import myFirebase from 'Service/Firebase'

import { ModalContainer, ModalContents } from 'Component/Global/Modal'

const Session = () => {
	// TODO: Cache static values like activity / encounter / game name
	// TODO: ButtonGroup functions
	// TODO / FIXME: SO MANY RENDERS
	// TODO / FIXME: Too many useEffects fetching data in sequence
	// TODO: Setup multiple websocket connections for data / chat etc
	const { sessionId } = useParams()
	const isAuthenticated = useSelector(state => state.auth?.isAuthenticated)
	const uid = useSelector(state => state.auth?.user?.uid)
	const username = useSelector(state => state.user?.details?.username)
	const localUsername = localStorage.getItem('localUsername')

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
			// Fetch activity name
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
			// Fetch encounter name
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
			// Fetch game name
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
		// Stop any timers
		clearInterval(messageTimer.current)

		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ message: '', encounter: encounterId })
	}

	const handleReadyCheck = checkActive => {
		// Stop any timers
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
		// Stop any running timer
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
		// Stop any timers
		clearInterval(messageTimer.current)

		// TODO: Disable buttons on wipe?
		myFirebase
			.database()
			.ref(`sessions/${sessionId}`)
			.update({ message: [{ text: message, time: 0 }] })
	}

	const handleTimer = messages => {
		// Stop any running timer
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

	// TODO: Return early?
	if (isLoading) {
		return (
			<>
				<h1>Loading session...</h1>
			</>
		)
	}

	if (sessionId && !isValid && !isLoading) {
		return (
			<>
				<h1>Session ID isn't valid</h1>
			</>
		)
	}

	if (!sessionId) {
		return (
			<>
				<h1>Session ID is required</h1>
				<p>
					<Link to="/join">Join an existing session</Link>
				</p>
				<p>or</p>
				{isAuthenticated && (
					<>
						<p>
							<Link to="/create">Create a new session</Link>
						</p>
					</>
				)}
				{!isAuthenticated && (
					<>
						<p>
							<Link to="/login">login</Link> to create a new session
						</p>
						<p>
							No account? <Link to="/register">Register now to create sessions</Link>
						</p>
					</>
				)}
			</>
		)
	}

	return (
		<>
			{/* TODO: styling for modals */}
			{readyCheckVal && readyCheckVal.active && (
				<ModalContainer>
					<ModalContents>
						<div>
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
						</div>
					</ModalContents>
				</ModalContainer>
			)}
			{changeEncounter && (
				<ModalContainer>
					<ModalContents>
						<div>
							<h3>Change encounter modal</h3>
							{activityEncounters.map(encounter => (
								<div key={encounter}>
									<button
										type="button"
										onClick={() => {
											setChangeEncounter(false)
											handleChangeEncounter(encounter)
										}}
									>
										{encounters[encounter].name}
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={() => {
									setChangeEncounter(false)
								}}
							>
								Cancel
							</button>
						</div>
					</ModalContents>
				</ModalContainer>
			)}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={{ padding: '0 20px' }}>
					<h2>{gameName}</h2>
				</div>
				<div style={{ padding: '0 20px' }}>
					<h2>{activityName}</h2>
				</div>
				<div style={{ padding: '0 20px' }}>
					{uid !== ownerIdVal && <h2>{encounterName}</h2>}
					{uid === ownerIdVal && (
						<button
							type="button"
							onClick={() => {
								setChangeEncounter(true)
							}}
						>
							{encounterName}
						</button>
					)}
				</div>
			</div>
			{uid === ownerIdVal && (
				<div style={{ width: '300px' }}>
					<h3>Admin menu</h3>
					<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
						<div style={{ flexBasis: '50%' }}>
							<button
								type="button"
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
								onClick={() => {
									handleReset()
								}}
							>
								Reset
							</button>
						</div>
						<div style={{ flexBasis: '50%' }}>
							<button
								type="button"
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
								onClick={() => {
									handleReadyCheck(true)
								}}
							>
								Ready check
							</button>
						</div>
					</div>
				</div>
			)}
			<div>
				<h3>Message section</h3>
				{displayMessage && <h3>{displayMessage}</h3>}
			</div>
			<div>
				{encounterVal && !encounterTemplates && (
					<>
						<h3>Loading templates</h3>
					</>
				)}
				{encounterVal && encounterTemplates && !encounterTemplates[encounterVal] && (
					<>
						<h3>No template found for {encounterName}</h3>
					</>
				)}
				{encounterVal && encounterTemplates?.[encounterVal] && (
					<>
						<div style={{ width: '75%', border: '1px solid green', padding: '20px' }}>
							{encounterTemplates[encounterVal].map((row, rowIndex) => {
								return (
									<div
										key={rowIndex}
										style={{
											display: 'flex',
											flexFlow: 'row nowrap',
											justifyContent: 'space-between',
											border: '1px solid red',
											padding: '20px',
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
														border: '1px solid goldenrod',
														padding: '20px',
													}}
												>
													{col.map(item => {
														if (item.type === 'group') {
															return (
																<div key={item.id}>
																	<ButtonGroup
																		orientation={item.direction}
																		buttons={item.buttons}
																		active={layoutVal[item.id] || ''}
																		click={buttonId => {
																			myFirebase
																				.database()
																				.ref(`sessions/${sessionId}`)
																				.update({ layout: { ...layoutVal, [item.id]: buttonId } })
																		}}
																	/>
																</div>
															)
														}

														if (item.type === 'message') {
															return (
																<div key={item.id}>
																	<MessageButton
																		onClick={() => {
																			handleMessage(item.message)
																		}}
																	>
																		{item.text}
																	</MessageButton>
																</div>
															)
														}

														if (item.type === 'timer') {
															return (
																<div key={item.id}>
																	<TimerButton
																		onClick={() => {
																			handleTimer([
																				{ message: item.message, time: item.time, showTime: item.showTime ?? false },
																			])
																		}}
																	>
																		{item.text}
																	</TimerButton>
																</div>
															)
														}

														return (
															<div key={item.id}>
																<ToggleButton
																	id={item.id}
																	active={layoutVal[item.id]}
																	onClick={() => {
																		handleToggle(item.id)
																	}}
																>
																	{item.text}
																</ToggleButton>
															</div>
														)
													})}
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					</>
				)}
			</div>
			{sessionError && <div>{sessionError}</div>}
		</>
	)
}

export default Session
