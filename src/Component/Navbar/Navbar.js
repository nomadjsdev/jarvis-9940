import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	return (
		<>
			<NavLink to="/">Home</NavLink> | {isAuthenticated ? <NavbarAuth /> : <NavbarDefault />}
		</>
	)
}

const NavbarDefault = () => (
	<>
		<NavLink to="/register">Register</NavLink> | <NavLink to="/login">Login</NavLink>
	</>
)

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const details = useSelector(state => state.user.details)

	return (
		<>
			<button
				type="button"
				onClick={() => {
					dispatch(logoutUser())
				}}
			>
				Logout
			</button>
			<span>{details.email}</span>
		</>
	)
}

export default Navbar
