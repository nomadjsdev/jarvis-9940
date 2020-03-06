import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import breakpoints from 'Styles/breakpoints'
import { colors } from 'Styles'

export const Container = styled.div`
	height: ${props => (props.menuIsOpen ? '100%' : '60px')};
`

export const Menu = styled.div`
	position: absolute;
	background: ${colors.background};
	${props => (['xs', 'sm'].includes(props.breakpoint) ? (props.menuIsOpen ? 'display: flex;' : 'display: none;') : '')}
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

export const ButtonForMenu = styled.div`
	position: relative;
	padding-top: 0.7rem;
	padding-right: 0.7rem;
	cursor: pointer;
	display: block;

	& span {
		background: ${colors.link};
		display: block;
		position: relative;
		width: 3.5rem;
		height: 0.4rem;
		margin-bottom: 0.7rem;
		transition: all ease-in-out 0.2s;
	}

	.open span:nth-child(2) {
		opacity: 0;
	}

	.open span:nth-child(3) {
		transform: rotate(45deg);
		top: -13px;
	}

	.open span:nth-child(1) {
		transform: rotate(-45deg);
		top: 21px;
	}

	@media (${breakpoints.forTabletPortraitUp}) {
		display: none;
	}
`
export const MenuContainer = styled.div`
	flex-basis: 100%;
	display: ${props => (props.menuIsOpen ? 'flex' : 'none')};
	flex-flow: column nowrap;
	justify-content: flex-end;

	@media (${breakpoints.forTabletPortraitUp}) {
		display: flex;
		flex-basis: 70%;
		flex-flow: row nowrap;
	}
`
