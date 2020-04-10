import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { LAST_UPDATED, MAX_SESSION_AGE } from 'Utils/Constants'
import { getCacheItem, setCacheItem } from 'Utils/Cache'
import { Fetch, Update } from 'Utils/Query'

import myFirebase from 'Service/Firebase'

import { Page, PrimarySection } from 'Component/Global/Layout'
import LocalUsernameForm from 'Component/LocalUsernameForm'
import Loading from 'Component/Global/Loading'

import AdminControls from './Components/AdminControls'
import ChangeEncounter from './Components/ChangeEncounter'
import Item from './Components/Item'
import MessageDisplay from './Components/MessageDisplay'
import ReadyCheck from './Components/ReadyCheck'
import SessionDetails from './Components/SessionDetails'
import SessionError from './Components/SessionError'

const Session = () => {
	// TODO / FIXME: SO MANY RENDERS
	// TODO / FIXME: Too many useEffects fetching data in sequence
	// TODO: Setup multiple websocket connections for data / chat etc

	const { sessionId = null } = useParams()
	const isAuthenticated = useSelector(state => state.auth?.isAuthenticated)

	if (!sessionId) {
		return <SessionError isAuthenticated={isAuthenticated} />
	}

	const localUsername = useSelector(state => state.user?.localUsername)

	if (!isAuthenticated && !localUsername) {
		return <LocalUsernameForm />
	}

	const uid = useSelector(state => state.auth?.user?.uid)
	const username = useSelector(state => state.user?.details?.username)
	const colorMode = useSelector(state => state.user?.colorMode)

	const [isLoading, setIsLoading] = React.useState(true)
	const [loadingMessage, setLoadingMessage] = React.useState(null)

	const [isValid, setIsValid] = React.useState(false)
	const [changeEncounter, setChangeEncounter] = React.useState(false)

	const [activityVal, setActivityVal] = React.useState(null)
	const [encounterVal, setEncounterVal] = React.useState(null)
	const [gameVal, setGameVal] = React.useState(null)
	const [layoutVal, setLayoutVal] = React.useState(null)
	const [messageVal, setMessageVal] = React.useState(null)
	const [ownerIdVal, setOwnerIdVal] = React.useState(null)
	const [readyCheckVal, setReadyCheckVal] = React.useState(null)
	const [gameName, setGameName] = React.useState(null)
	const [activityName, setActivityName] = React.useState(null)
	const [activityEncounters, setActivityEncounters] = React.useState(null)
	const [encounters, setEncounters] = React.useState(null)
	const [encounterTemplates, setEncounterTemplates] = React.useState(null)
	const [displayMessage, setDisplayMessage] = React.useState(null)

	// Preserve interval across renders
	let messageTimer = React.useRef()

	React.useEffect(() => {
		let firebaseRef = myFirebase.database().ref(`sessions/${sessionId.toUpperCase()}`)
		let listener
		if (sessionId) {
			setLoadingMessage('Connecting to session')

			listener = firebaseRef.on('value', snapshot => {
				if (snapshot.exists()) {
					const { created, activity, encounter, game, layout, message, ownerId, readyCheck } = snapshot.val()

					if (created < Math.floor(Date.now() / 1000) - MAX_SESSION_AGE) {
						firebaseRef.off('value', listener)
						setLoadingMessage('This session has expired')
						setIsValid(false)
						setIsLoading(false)
					} else {
						setIsValid(true)
						setActivityVal(activity)
						setEncounterVal(encounter)
						setGameVal(game)
						setLayoutVal(layout)
						setMessageVal(message)
						setOwnerIdVal(ownerId)
						setReadyCheckVal(readyCheck)
					}
				} else {
					firebaseRef.off('value', listener)
					setIsLoading(false)
					setIsValid(false)
					setActivityVal(null)
					setEncounterVal(null)
					setGameVal(null)
					setLayoutVal(null)
					setMessageVal(null)
					setOwnerIdVal(null)
					setReadyCheckVal(null)
				}
			})
		}

		// Kill websocket connection on unmount
		return () => firebaseRef.off('value', listener)
	}, [sessionId])

	React.useEffect(() => {
		if (
			gameName &&
			activityName &&
			activityEncounters &&
			encounters &&
			encounterTemplates &&
			layoutVal &&
			ownerIdVal &&
			readyCheckVal
		) {
			setIsLoading(false)
		}
	}, [gameName, activityName, activityEncounters, encounters, encounterTemplates, layoutVal, ownerIdVal, readyCheckVal])

	// Get game name
	React.useEffect(() => {
		if (gameVal) {
			const game = getCacheItem(`cache-${gameVal}-name`)

			if (!game) {
				Fetch(`games/${gameVal}`).then(result => {
					setCacheItem(`cache-${gameVal}-name`, { lastUpdated: LAST_UPDATED, data: result.name })
					setGameName(result.name)
				})
			} else {
				setGameName(game.data)
			}
		}
	}, [gameVal])

	// Get activity name
	React.useEffect(() => {
		if (activityVal) {
			const activity = getCacheItem(`cache-${activityVal}-name`)

			if (!activity) {
				Fetch(`activities/${activityVal}`).then(result => {
					setCacheItem(`cache-${activityVal}-name`, { lastUpdated: LAST_UPDATED, data: result.name })
					setActivityName(result.name)
				})
			} else {
				setActivityName(activity.data)
			}
		}
	}, [activityVal])

	// Get activity encounters
	React.useEffect(() => {
		if (activityVal) {
			const activityE = getCacheItem(`cache-${activityVal}-encounters`)

			if (!activityE) {
				Fetch(`activityEncounters/${activityVal}`).then(result => {
					setCacheItem(`cache-${activityVal}-encounters`, { lastUpdated: LAST_UPDATED, data: result })
					setActivityEncounters(result)
				})
			} else {
				setActivityEncounters(activityE.data)
			}
		}
	}, [activityVal])

	const fetchEncounterTemplates = async () => {
		setLoadingMessage('Loading templates')

		let templateObject
		let encounterObject
		for (let encounter of activityEncounters) {
			let encounterObj = getCacheItem(`cache-${encounter}`)

			if (!encounterObj) {
				encounterObj = await Fetch(`encounters/${encounter}`).then(result => {
					setCacheItem(`cache-${encounter}`, { lastUpdated: LAST_UPDATED, data: result })
					return { data: result }
				})
			}

			if (encounterObj?.data) {
				encounterObject = { ...encounterObject, [encounter]: { name: encounterObj.data.name } }

				let template = getCacheItem(`template-${encounter}`)

				if (!template) {
					template = await Fetch(`encounterTemplates/${encounter}`).then(result => {
						setCacheItem(`template-${encounter}`, { lastUpdated: LAST_UPDATED, data: result })
						return { data: result }
					})
				}

				if (template) {
					templateObject = { ...templateObject, [encounter]: template.data }
				}
			}
		}

		setEncounters(encounterObject)
		setEncounterTemplates(templateObject)
	}

	// Fetch encounter templates
	React.useEffect(() => {
		if (activityEncounters) {
			fetchEncounterTemplates()
		}
	}, [activityEncounters])

	// Update display message using timer
	React.useEffect(() => {
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

	const handleChangeEncounter = encounterId => {
		clearInterval(messageTimer.current)

		const ref = `sessions/${sessionId}`
		const data = { message: '', encounter: encounterId }

		Update(ref, data)
	}

	const handleReadyCheck = checkActive => {
		clearInterval(messageTimer.current)

		const ref = `sessions/${sessionId}`
		const data = { message: '', readyCheck: { active: checkActive } }

		Update(ref, data)
	}

	const submitReadyCheck = (playerId, status) => {
		clearInterval(messageTimer.current)

		const ref = `sessions/${sessionId}`
		const data = {
			readyCheck: {
				...readyCheckVal,
				players: { ...readyCheckVal.players, [playerId]: status },
			},
		}

		Update(ref, data)
	}

	const handleReset = () => {
		clearInterval(messageTimer.current)

		const ref = `sessions/${sessionId}`
		const data = {
			message: '',
		}

		// TODO: Reset button states
		Update(ref, data)
	}

	const handleToggle = buttonId => {
		const ref = `sessions/${sessionId}`
		const data = { layout: { ...layoutVal, [buttonId]: !layoutVal[buttonId] } }

		Update(ref, data)
	}

	const handleMessage = message => {
		clearInterval(messageTimer.current)

		const ref = `sessions/${sessionId}`
		const data = { message: [{ text: message, time: 0 }] }

		// TODO: Disable buttons on wipe?
		Update(ref, data)
	}

	const handleTimer = messages => {
		clearInterval(messageTimer.current)

		let timestamp = Math.floor(Date.now() / 1000)

		let messageArray = []
		for (let element of messages) {
			timestamp = timestamp + element.time
			messageArray.push({ text: element.message, time: timestamp, showTime: element.showTime })
		}

		const ref = `sessions/${sessionId}`
		const data = {
			message: messageArray,
		}

		Update(ref, data)
	}

	const handleGroup = itemId => {
		return buttonId => {
			const ref = `sessions/${sessionId}`
			const data = {
				layout: { ...layoutVal, [itemId]: buttonId === 'reset' ? false : buttonId },
			}

			Update(ref, data)
		}
	}

	if (isLoading) {
		return <Loading loadingMessage={loadingMessage} />
	}

	if (sessionId && !isValid && !isLoading) {
		return (
			<React.Fragment>
				<h2>Session ID isn't valid</h2>
				{loadingMessage && <h4>{loadingMessage}</h4>}
			</React.Fragment>
		)
	}

	return (
		<Page>
			{readyCheckVal && readyCheckVal.active && (
				<ReadyCheck
					uid={uid}
					ownerIdVal={ownerIdVal}
					handleReadyCheck={handleReadyCheck}
					readyCheckVal={readyCheckVal}
					submitReadyCheck={submitReadyCheck}
					username={username}
					localUsername={localUsername}
					colorMode={colorMode}
				/>
			)}

			{changeEncounter && (
				<ChangeEncounter
					activityEncounters={activityEncounters}
					setChangeEncounter={setChangeEncounter}
					handleChangeEncounter={handleChangeEncounter}
					encounters={encounters}
				/>
			)}

			<PrimarySection
				style={{
					width: '100%',
					maxWidth: '600px',
					margin: '0 auto',
				}}
			>
				<SessionDetails gameName={gameName} activityName={activityName} sessionId={sessionId} />

				{uid === ownerIdVal && (
					<AdminControls
						setChangeEncounter={setChangeEncounter}
						handleTimer={handleTimer}
						handleReset={handleReset}
						handleMessage={handleMessage}
						handleReadyCheck={handleReadyCheck}
					/>
				)}

				<MessageDisplay displayMessage={displayMessage} encounterName={encounters?.[encounterVal]?.name} />

				<React.Fragment>
					{encounters && encounterVal && encounterTemplates && !encounterTemplates?.[encounterVal] && (
						<React.Fragment>
							<h3>No template found for {encounters?.[encounterVal]?.name}</h3>
						</React.Fragment>
					)}

					{encounterVal && encounterTemplates?.[encounterVal] && (
						<div style={{ width: '100%' }}>
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
												<React.Fragment key={colIndex}>
													{col.map(item => (
														<div
															key={item.id}
															style={{
																display: 'flex',
																justifyContent:
																	item.alignment === 'right'
																		? 'flex-end'
																		: item.alignment === 'center'
																		? 'center'
																		: 'flex-start',
																width: '100%',
																minHeight: '6em',
															}}
														>
															<Item
																item={item}
																colorMode={colorMode}
																layoutVal={layoutVal}
																handleGroup={handleGroup}
																handleMessage={handleMessage}
																handleTimer={handleTimer}
																handleToggle={handleToggle}
															/>
														</div>
													))}
												</React.Fragment>
											)
										})}
									</div>
								)
							})}
						</div>
					)}
				</React.Fragment>
			</PrimarySection>
		</Page>
	)
}

export default Session
