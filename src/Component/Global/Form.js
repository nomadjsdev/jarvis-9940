import styled from 'styled-components'

import { colors } from 'Styles'

export const SubmitContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const SubmitButton = styled.button`
	margin: 5px;
	background: ${props => (props.active ? colors.primaryText : colors.background)};
	color: ${props => (props.active ? colors.background : colors.primaryText)};
	border: 1px solid ${props => (props.active ? colors.background : colors.primaryText)};
	border-radius: 5px;
	height: 40px;
	min-width: 100px;

	:disabled,
	[disabled] {
		opacity: 0.5;
	}
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

export const InputField = styled.input`
	width: 100%;
	height: 30px;
`

export const ErrorText = styled.p`
	color: red;
	font-weight: bold;
`
