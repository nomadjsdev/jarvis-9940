import React from 'react'
import styled from 'styled-components'

import ExternalLink from 'Component/Global/ExternalLink'

const Container = styled.div`
	margin-top: 2em;
`

const FooterText = styled.p`
	font-size: 0.8em;
`

const Footer = () => {
	return (
		<Container>
			<FooterText>
				Jarvis 99-40 created by{' '}
				<ExternalLink link="https://www.reddit.com/message/compose/?to=ItchySensation">ItchySensation</ExternalLink>.
				Original idea and encounter design by{' '}
				<ExternalLink link="https://www.reddit.com/message/compose/?to=m4v3r1c8">M4V3R1C8</ExternalLink>.
			</FooterText>
			<FooterText>
				Support can be found at <ExternalLink link="https://www.reddit.com/r/jarvis9940">/r/jarvis9940</ExternalLink>.
			</FooterText>
			<FooterText>
				Logo, settings, and profile icons made by{' '}
				<ExternalLink link="https://www.flaticon.com/authors/freepik" title="Freepik">
					Freepik
				</ExternalLink>
				from{' '}
				<ExternalLink link="https://www.flaticon.com/" title="Flaticon">
					www.flaticon.com
				</ExternalLink>
			</FooterText>
		</Container>
	)
}

export default Footer
