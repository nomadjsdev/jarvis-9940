import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import myFirebase from 'Service/Firebase'

import { Page, PrimarySection } from 'Component/Global/Layout'
import { SubmitButton } from 'Component/Global/Form'
import Loading from 'Component/Global/Loading'

const createSessionId = () =>
	(Math.random().toString(36) + Math.random().toString(36))
		.replace(/[^a-z]+/g, '')
		.substr(0, 6)
		.toUpperCase()

const Create = () => {
	let history = useHistory()
	const uid = useSelector(state => state.auth?.user?.uid)
	// TODO: Abstract these fetches into Redux slices
	// TODO: Store these fetches in LocalStorage

	const [games, setGames] = React.useState(null)
	React.useEffect(() => {
		const ref = myFirebase.database().ref(`games`)
		if (!games) {
			ref.once('value').then(snapshot => {
				setGames(snapshot.val())
			})
		}

		return () => {
			ref.off()
		}
	}, [])

	// TODO: Fetch activities based on selected game
	// Upside: less data fetching
	// Downside: will slow down user flow

	const [gamePveActivities, setGamePveActivities] = React.useState(null)
	React.useEffect(() => {
		const ref = myFirebase.database().ref(`gamePveActivities`)
		if (!gamePveActivities) {
			ref.once('value').then(snapshot => {
				setGamePveActivities(snapshot.val())
			})
		}

		return () => {
			ref.off()
		}
	}, [gamePveActivities])

	const [gamePvpActivities, setGamePvpActivities] = React.useState(null)
	React.useEffect(() => {
		const ref = myFirebase.database().ref(`gamePvpActivities`)
		if (!gamePvpActivities) {
			ref.once('value').then(snapshot => {
				setGamePvpActivities(snapshot.val())
			})
		}

		return () => {
			ref.off()
		}
	}, [gamePvpActivities])

	const [activities, setActivities] = React.useState(null)
	React.useEffect(() => {
		const ref = myFirebase.database().ref(`activities`)
		if (!activities) {
			ref.once('value').then(snapshot => {
				setActivities(snapshot.val())
			})
		}

		return () => {
			ref.off()
		}
	}, [activities])

	const [encounters, setEncounters] = React.useState(null)
	React.useEffect(() => {
		const ref = myFirebase.database().ref(`encounters`)
		if (!encounters) {
			ref.once('value').then(snapshot => {
				setEncounters(snapshot.val())
			})
		}

		return () => {
			ref.off()
		}
	}, [encounters])

	const [selectedGame, setSelectedGame] = React.useState(null)
	const [selectedActivity, setSelectedActivity] = React.useState(null)
	const [isCreating, setIsCreating] = React.useState(false)

	React.useEffect(() => {
		const fetchActivityEncounters = activityId => {
			return new Promise(resolve => {
				myFirebase
					.database()
					.ref(`activityEncounters/${activityId}`)
					.once('value')
					.then(snapshot => {
						resolve(snapshot.val())
					})
			})
		}

		const fetchEncounterTemplate = encounterId => {
			return new Promise(resolve => {
				myFirebase
					.database()
					.ref(`encounterTemplates/${encounterId}`)
					.once('value')
					.then(snapshot => {
						resolve(snapshot.val())
					})
			})
		}

		const getButtonIds = template => {
			let buttonIdArray = []
			for (let row of template) {
				for (let col of row) {
					for (let button of col) {
						if (button.type === 'toggle' || button.type === 'group') {
							buttonIdArray.push(button.id)
						}
					}
				}
			}
			return buttonIdArray
		}

		const run = async () => {
			setIsCreating(true)

			// Create session ID
			let newSessionId = createSessionId()

			// Get all encounters in activity
			const activityEncounters = await fetchActivityEncounters(selectedActivity)

			let layoutObject = {}
			if (activityEncounters) {
				for (const encounter of activityEncounters) {
					const encounterTemplate = await fetchEncounterTemplate(encounter)
					if (encounterTemplate) {
						const buttonIdArray = getButtonIds(encounterTemplate)

						for (let buttonId of buttonIdArray) {
							layoutObject = {
								...layoutObject,
								[buttonId]: false,
							}
						}
					}
				}
			}

			const timestamp = Math.floor(Date.now() / 1000)

			let dbObj = {
				activity: selectedActivity,
				created: timestamp,
				encounter: activityEncounters[0],
				game: selectedGame,
				layout: layoutObject,
				message: '',
				ownerId: uid,
				readyCheck: { active: false },
			}

			myFirebase
				.database()
				.ref(`sessions/${newSessionId}`)
				.set(dbObj)
				.then(() => {
					history.push(`/session/${newSessionId}`)
				})
				.catch(error => {
					console.log(error)
				})
		}

		if (selectedActivity && !isCreating) {
			run()
		}
	}, [selectedActivity, history, isCreating, selectedGame, uid])

	return (
		<Page>
			{isCreating && <Loading loadingMessage="Creating new session" />}

			{!isCreating && (
				<PrimarySection>
					<div style={{ maxWidth: '300px', margin: '0 auto' }}>
						<h1>Create a new session</h1>
						{games && (
							<React.Fragment>
								<h2>Select game:</h2>
								<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
									{Object.keys(games).map(id => (
										<SubmitButton
											key={id}
											type="button"
											onClick={() => {
												setSelectedGame(id)
											}}
											active={selectedGame === id}
											disabled={isCreating || !games[id].isActive}
										>
											{games[id].name}
										</SubmitButton>
									))}
								</div>
							</React.Fragment>
						)}
						{selectedGame && (
							<React.Fragment>
								<h2>Select activity:</h2>
								<div style={{ display: 'flex' }}>
									{games[selectedGame].hasPve && (
										<div>
											<h3>PvE</h3>
											{Object.keys(gamePveActivities[selectedGame]).map(id => {
												if (activities[gamePveActivities[selectedGame][id]]) {
													return (
														<SubmitButton
															key={id}
															type="button"
															onClick={() => {
																setSelectedActivity(gamePveActivities[selectedGame][id])
															}}
															active={selectedActivity === id}
															disabled={isCreating || !activities[gamePveActivities[selectedGame][id]].isActive}
														>
															{activities[gamePveActivities[selectedGame][id]].name}
														</SubmitButton>
													)
												}
												return false
											})}
										</div>
									)}
									{games[selectedGame].hasPvp && (
										<div>
											<h3>PvP</h3>
											{Object.keys(gamePvpActivities[selectedGame]).map(id => {
												if (activities[gamePvpActivities[selectedGame][id]]) {
													return (
														<SubmitButton
															key={id}
															type="button"
															onClick={() => {
																setSelectedActivity(gamePvpActivities[selectedGame][id])
															}}
															active={selectedActivity === id}
															disabled={isCreating || !activities[gamePveActivities[selectedGame][id]].isActive}
														>
															{activities[gamePvpActivities[selectedGame][id]].name}
														</SubmitButton>
													)
												}
												return false
											})}
										</div>
									)}
								</div>
							</React.Fragment>
						)}
					</div>
				</PrimarySection>
			)}
		</Page>
	)
}

export default Create
