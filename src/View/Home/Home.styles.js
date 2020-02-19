import styled from 'styled-components'

import { breakpoints, colors, typography } from 'Styles'

export const MainHeader = styled.h1`
	font-size: 6rem;
	margin: 0.2em 0;

	@media (${breakpoints.forLargePhoneUp}) {
		font-size: 7.5rem;
		margin: 0.5em 0;
	}
`

export const SubHeader = styled.h2`
	font-size: 1.5rem;

	@media (${breakpoints.forLargePhoneUp}) {
		font-size: 2rem;
	}
`
