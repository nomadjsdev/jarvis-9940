import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import LocalUsernameForm from 'Component/LocalUsernameForm'

import { Container, Menu, StyledNavLink, MenuButton } from './Navbar.styles'

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const localUsername = useSelector(state => state.user.localUsername)
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	let location = useLocation()
	useEffect(() => {
		setMenuIsOpen(false)
	}, [location])

	const [changeUsername, setChangeUsername] = useState(false)

	return (
		<React.Fragment>
			{changeUsername && <LocalUsernameForm />}
			<Container menuIsOpen={menuIsOpen}>
				<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
					<Link to="/">
						<h2 style={{ marginLeft: '20px' }}>Jarvis 99-40</h2>
					</Link>
					<MenuButton
						onClick={() => {
							setMenuIsOpen(!menuIsOpen)
						}}
					>
						{menuIsOpen ? 'Close' : 'Menu'}
					</MenuButton>
				</div>
				<Menu menuIsOpen={menuIsOpen}>
					<StyledNavLink to="/join">Join session</StyledNavLink>
					{isAuthenticated ? (
						<NavbarAuth />
					) : (
						<React.Fragment>
							<NavbarDefault />
							{localUsername && (
								<React.Fragment>
									<span>{localUsername}</span>{' '}
									<button
										type="button"
										onClick={() => {
											setMenuIsOpen(false)
											setChangeUsername(true)
										}}
									>
										Change...
									</button>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</Menu>
			</Container>
		</React.Fragment>
	)
}

const NavbarDefault = () => {
	return (
		<React.Fragment>
			<StyledNavLink to="/register">Register</StyledNavLink>
			<StyledNavLink to="/login">Login</StyledNavLink>
		</React.Fragment>
	)
}

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)

	return (
		<React.Fragment>
			<StyledNavLink to="/create">Create new session</StyledNavLink>
			<button
				type="button"
				onClick={() => {
					dispatch(logoutUser())
				}}
			>
				Logout
			</button>
			<span>{username}</span>
			<StyledNavLink to="/profile">Profile</StyledNavLink>
		</React.Fragment>
	)
}

export default Navbar
