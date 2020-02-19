import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from 'Styles'

export const Container = styled.div`
	height: ${props => (props.menuIsOpen ? '100%' : '60px')};
`

export const Menu = styled.div`
	display: ${props => (props.menuIsOpen ? 'flex' : 'none')};
	flex-direction: column;
	z-index: 2;
`

export const StyledNavLink = styled(NavLink)`
	padding: 5px 0 5px 20px;
	z-index: 3;
`
export const MenuButton = styled.button`
	position: absolute;
	right: 0;
	margin: 5px;
	background: ${colors.background};
	border: 1px solid ${colors.primaryText};
	border-radius: 5px;
	height: 50px;
	width: 50px;
	color: ${colors.primaryText};
	z-index: 4;
`
