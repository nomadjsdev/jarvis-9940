import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import { SubmitButton } from 'Component/Global/Form'
import LocalUsernameForm from 'Component/LocalUsernameForm'
import ChangeColorSettings from 'Component/ChangeColorSettings'

import { StyledNavLink, ButtonForMenu, MenuContainer } from './Navbar.styles'

const Logo = () => (
	<Link to="/">
		<h2 style={{ marginLeft: '20px' }}>Jarvis 99-40</h2>
	</Link>
)

const Burgermenu = ({ menuIsOpen, handleClick }) => (
	<ButtonForMenu onClick={handleClick}>
		<div className={menuIsOpen ? 'open' : ''}>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
			<span>&nbsp;</span>
		</div>
	</ButtonForMenu>
)

const LocalUsername = ({ setChangeUsername }) => {
	const localUsername = useSelector(state => state.user.localUsername)

	return (
		<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
			{localUsername && <p style={{ padding: '0 20px' }}>{localUsername}</p>}
			<SubmitButton
				type="button"
				style={{ flexGrow: 1 }}
				onClick={() => {
					setChangeUsername(true)
				}}
			>
				{localUsername ? 'Change username' : 'Set username'}
			</SubmitButton>
		</div>
	)
}

const ColorblindMode = ({ setChangeColorSettings }) => (
	<SubmitButton
		type="button"
		style={{ marginBottom: '10px' }}
		onClick={() => {
			setChangeColorSettings(true)
		}}
	>
		Colorblind mode
	</SubmitButton>
)

const NavbarDefault = ({ setMenuIsOpen, setChangeUsername }) => (
	<React.Fragment>
		<StyledNavLink to="/register">Register</StyledNavLink>
		<StyledNavLink to="/login">Login</StyledNavLink>
		<LocalUsername setMenuIsOpen={setMenuIsOpen} setChangeUsername={setChangeUsername} />
	</React.Fragment>
)

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)

	return (
		<React.Fragment>
			<StyledNavLink to="/create">Create new session</StyledNavLink>
			<p style={{ padding: '0 20px' }}>{username}</p>
			<SubmitButton
				type="button"
				onClick={() => {
					dispatch(logoutUser())
				}}
			>
				Logout
			</SubmitButton>
			{/* <StyledNavLink to="/profile">Profile</StyledNavLink> */}
		</React.Fragment>
	)
}

export default () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const [menuIsOpen, setMenuIsOpen] = useState(false)
	const handleClick = () => {
		setMenuIsOpen(!menuIsOpen)
	}

	let location = useLocation()
	useEffect(() => {
		setMenuIsOpen(false)
	}, [location])

	const [changeUsername, setChangeUsername] = useState(false)
	const [changeColorSettings, setChangeColorSettings] = useState(false)

	return (
		<React.Fragment>
			{changeUsername && <LocalUsernameForm modalIsOpen={setChangeUsername} />}

			{changeColorSettings && <ChangeColorSettings modalIsOpen={setChangeColorSettings} />}

			<div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', border: '1px solid' }}>
				<div style={{}}>
					<Logo />
				</div>
				<div style={{}}>
					<Burgermenu menuIsOpen={menuIsOpen} handleClick={handleClick} />
				</div>
				<MenuContainer menuIsOpen={menuIsOpen}>
					<StyledNavLink to="/join">Join session</StyledNavLink>

					{isAuthenticated ? <NavbarAuth /> : <NavbarDefault setChangeUsername={setChangeUsername} />}

					<ColorblindMode setChangeColorSettings={setChangeColorSettings} />
				</MenuContainer>
			</div>
		</React.Fragment>
	)
}
