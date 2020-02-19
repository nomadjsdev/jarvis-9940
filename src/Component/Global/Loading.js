import styled, { keyframes } from 'styled-components'

import colors from 'Styles/colors'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.div`
	background: ${colors.background};
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const LoadingIcon = styled.div`
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);

	border-top: 4px solid lightgrey;
	border-right: 4px solid lightgrey;
	border-bottom: 4px solid lightgrey;
	border-left: 4px solid white;
	background: transparent;
	width: 24px;
	height: 24px;
	border-radius: 50%;
`
