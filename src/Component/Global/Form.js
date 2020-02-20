import styled from 'styled-components'

import { colors } from 'Styles'

export const SubmitButton = styled.button`
	margin: 5px;
	background: ${props => (props.active ? colors.primaryText : colors.background)};
	border: 1px solid ${props => (props.active ? colors.background : colors.primaryText)};
	border-radius: 5px;
	height: 40px;
	width: 100px;
	color: ${props => (props.active ? colors.background : colors.primaryText)};
`

export const FieldContainer = styled.p`
	position: relative;
`

export const FieldWarning = styled.span`
	color: red;
	font-weight: bold;
	position: absolute;
	right: 0;
	top: 0;
	padding: 10px;
`
