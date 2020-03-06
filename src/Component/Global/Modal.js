import React from 'react'
import styled from 'styled-components'

import { colors } from 'Styles'

const ModalContainer = styled.div`
	position: fixed; /* Stay in place */
	z-index: 5; /* Sit on top */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

const ModalContents = styled.div`
	background-color: ${colors.background};
	margin: 20% auto; /* 20% from the top and centered */
	padding: 0 20px;
	border: 1px solid #888;
	width: 80%; /* Could be more or less; depending on screen size */
`

export default ({ children }) => (
	<ModalContainer>
		<ModalContents>{children}</ModalContents>
	</ModalContainer>
)
