import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import useLocalUsername from 'Hook/useLocalUsername'

import { Container, Menu, StyledNavLink, MenuButton } from './Navbar.styles'

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	let location = useLocation()
	useEffect(() => {
		setMenuIsOpen(false)
	}, [location])

	return (
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
				{isAuthenticated ? <NavbarAuth /> : <NavbarDefault />}
			</Menu>
		</Container>
	)
}

const NavbarDefault = () => {
	const [localUsername, setLocalUsername] = useLocalUsername()

	return (
		<>
			<StyledNavLink to="/register">Register</StyledNavLink>
			<StyledNavLink to="/login">Login</StyledNavLink>
			{localUsername && (
				<>
					<span>{localUsername}</span>{' '}
					<button
						type="button"
						onClick={() => {
							setLocalUsername('Test2') //TODO: Bring in popup to handle name change
						}}
					>
						Change...
					</button>
				</>
			)}
			{!localUsername && (
				<>
					<button
						type="button"
						onClick={() => {
							setLocalUsername('Test')
						}}
					>
						Set username
					</button>
				</>
			)}
		</>
	)
}

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)

	return (
		<>
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
		</>
	)
}

export default Navbar
