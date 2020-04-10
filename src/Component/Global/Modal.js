import React from 'react'
import styled from 'styled-components'

import { colors } from 'Styles'

const ModalContainer = styled.div`
	position: fixed;
	z-index: 5;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

const ModalContents = styled.div`
	background-color: ${colors.background};
	margin: 100px auto;
	padding: 0 20px;
	border: 1px solid #888;
	width: 80%;
	max-width: 1000px;
`

export default ({ children }) => (
	<ModalContainer>
		<ModalContents>{children}</ModalContents>
	</ModalContainer>
)
