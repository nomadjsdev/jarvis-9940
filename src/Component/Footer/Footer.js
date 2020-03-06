import React from 'react'

import ExternalLink from 'Component/Global/ExternalLink'

const Footer = () => {
	return (
		<div style={{ marginTop: '2em' }}>
			<p style={{ fontSize: '0.8em' }}>
				Jarvis 99-40 created by{' '}
				<ExternalLink link="https://www.reddit.com/message/compose/?to=ItchySensation">ItchySensation</ExternalLink>.
				Original idea and encounter design by{' '}
				<ExternalLink link="https://www.reddit.com/message/compose/?to=m4v3r1c8">M4V3R1C8</ExternalLink>.
			</p>
			<p style={{ fontSize: '0.8em' }}>
				Support can be found at <ExternalLink link="https://www.reddit.com/r/jarvis9940">/r/jarvis9940</ExternalLink>.
			</p>
			<p style={{ fontSize: '0.8em' }}>
				Logo, settings, and profile icons made by{' '}
				<ExternalLink link="https://www.flaticon.com/authors/freepik" title="Freepik">
					Freepik
				</ExternalLink>
				from{' '}
				<ExternalLink link="https://www.flaticon.com/" title="Flaticon">
					www.flaticon.com
				</ExternalLink>
			</p>
		</div>
	)
}

export default Footer
