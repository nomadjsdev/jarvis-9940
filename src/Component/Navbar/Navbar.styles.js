import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import colors from 'Styles/colors'

export const StyledNavLink = styled(NavLink)`
	margin: 10px 10px 10px 0;
`

export const MenuContainer = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
`
export const DropdownContainer = styled.div`
	display: ${props => (props.isOpen ? 'flex' : 'none')};
	flex-flow: column nowrap;
	align-items: flex-end;
	position: absolute;
	top: 60px;
	right: 10px;
	border: 1px solid;
	background-color: ${colors.background};
	min-width: 180px;
	min-height: 120px;
`
