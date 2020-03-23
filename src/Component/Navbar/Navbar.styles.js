import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { breakpoints, colors } from 'Styles'

export const StyledNavLink = styled(NavLink)`
	margin: 10px 10px 10px 0;
`

export const NavbarContainer = styled.div`
	border-bottom: 1px solid;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	max-width: 1024px;
	margin: 0 auto;
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
	z-index: 5;
`

export const LogoImg = styled.img`
	max-width: 50px;
	max-height: 50px;
	padding: 10px;
`

export const LogoText = styled.h2`
	margin-left: 20px;
	display: none;

	@media (${breakpoints.forTabletPortraitUp}) {
		display: block;
	}
`

export const HeaderImgContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	margin-right: 10px;
`

export const HeaderImg = styled.img`
	max-width: 40px;
	max-height: 40px;
`
