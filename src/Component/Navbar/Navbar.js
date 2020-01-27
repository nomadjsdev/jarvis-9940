import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import useLocalUsername from 'Hook/useLocalUsername'

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	return (
		<>
			<NavLink to="/">Home</NavLink> | <NavLink to="/join">Join session</NavLink> |{' '}
			{isAuthenticated ? <NavbarAuth /> : <NavbarDefault />}
		</>
	)
}

const NavbarDefault = () => {
	const [localUsername, setLocalUsername] = useLocalUsername()

	return (
		<>
			<NavLink to="/register">Register</NavLink> | <NavLink to="/login">Login</NavLink>
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
			<NavLink to="/create">Create new session</NavLink> |
			<button
				type="button"
				onClick={() => {
					dispatch(logoutUser())
				}}
			>
				Logout
			</button>
			<span>{username}</span>
		</>
	)
}

export default Navbar
