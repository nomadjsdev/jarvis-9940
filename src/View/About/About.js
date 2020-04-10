import React from 'react'

import { Page, PrimarySection } from 'Component/Global/Layout'

const About = () => {
	return (
		<Page>
			<PrimarySection>
				<h1>What is Jarvis 99-40?</h1>
				<p>
					The inspiration for Jarvis came in a post made by <a href="https://www.reddit.com/u/M4V3R1C8">Maverick</a> on
					the /r/DestinyTheGame subreddit on 2017-09-27.
				</p>
				<p>
					Players of the video game Destiny 2 who are Deaf or Hard of Hearing were struggling with a piece of end-game
					content which seemed to be designed with voice communication in mind. Maverick was seeking help creating a
					system which aimed to make these encounters slightly easier, as players were currently relying on in-game
					emotes, Discord, or signing via Skype.
				</p>
				<p>
					This system was launched as Jarvis 99-40, and allowed players to communicate using symbols on a webpage which
					update in realtime for every player in the session.
				</p>
				<p>
					System design is handled by <a href="https://www.reddit.com/u/ItchySensation">ItchySensation</a>. All layouts
					have been designed by Maverick.
				</p>
			</PrimarySection>
		</Page>
	)
}

export default About
