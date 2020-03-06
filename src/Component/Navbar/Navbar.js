import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import { SubmitButton } from 'Component/Global/Form'
import LocalUsernameForm from 'Component/LocalUsernameForm'
import ChangeColorSettings from 'Component/ChangeColorSettings'

import LogoImg from 'Assets/Images/robot.64.png'
import SettingsImg from 'Assets/Images/settings.64.png'
import ProfileImg from 'Assets/Images/profile.64.png'

import { StyledNavLink, MenuContainer, DropdownContainer } from './Navbar.styles'

const Logo = () => (
	<Link to="/">
		<img src={LogoImg} style={{ maxWidth: '50px', maxHeight: '50px', padding: '10px' }} />
		{/* <h2 style={{ marginLeft: '20px' }}>Jarvis 99-40</h2> */}
	</Link>
)

const LocalUsername = () => {
	const localUsername = useSelector(state => state.user.localUsername)
	const [changeUsername, setChangeUsername] = useState(false)

	return (
		<React.Fragment>
			{changeUsername && <LocalUsernameForm modalIsOpen={setChangeUsername} />}

			<div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
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
		</React.Fragment>
	)
}

const ColorblindMode = ({ setChangeColorSettings, setMenuIsOpen }) => (
	<SubmitButton
		type="button"
		style={{ marginBottom: '10px' }}
		onClick={() => {
			setMenuIsOpen(null)
			setChangeColorSettings(true)
		}}
	>
		Colorblind mode
	</SubmitButton>
)

const SettingsIcon = ({ menuIsOpen, setMenuIsOpen }) => {
	const [changeColorSettings, setChangeColorSettings] = useState(false)

	return (
		<React.Fragment>
			{changeColorSettings && <ChangeColorSettings modalIsOpen={setChangeColorSettings} />}

			<div style={{ display: 'flex', alignItems: 'center', position: 'relative', margin: '10px' }}>
				<img
					style={{ maxWidth: '40px', maxHeight: '40px' }}
					src={SettingsImg}
					onClick={() => {
						setMenuIsOpen(prevState => (prevState === 'settings' ? null : 'settings'))
					}}
				/>
				<DropdownContainer isOpen={menuIsOpen === 'settings'}>
					<ColorblindMode setChangeColorSettings={setChangeColorSettings} setMenuIsOpen={setMenuIsOpen} />
				</DropdownContainer>
			</div>
		</React.Fragment>
	)
}

const ProfileIcon = ({ menuIsOpen, setMenuIsOpen, isAuthenticated }) => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)

	return (
		<div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginRight: '10px' }}>
			<img
				style={{ maxWidth: '40px', maxHeight: '40px' }}
				src={ProfileImg}
				onClick={() => {
					setMenuIsOpen(prevState => (prevState === 'profile' ? null : 'profile'))
				}}
			/>
			<DropdownContainer isOpen={menuIsOpen === 'profile'}>
				{isAuthenticated && (
					<React.Fragment>
						<p style={{ padding: '0 20px' }}>{username}</p>
						<SubmitButton
							type="button"
							onClick={() => {
								dispatch(logoutUser())
							}}
						>
							Logout
						</SubmitButton>
					</React.Fragment>
				)}
				{!isAuthenticated && (
					<React.Fragment>
						<StyledNavLink to="/register">Register</StyledNavLink>
						<StyledNavLink to="/login">Login</StyledNavLink>
						<LocalUsername />
					</React.Fragment>
				)}
			</DropdownContainer>
		</div>
	)
}

export default () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const [menuIsOpen, setMenuIsOpen] = useState(null)
	let location = useLocation()
	useEffect(() => {
		setMenuIsOpen(null)
	}, [location])

	return (
		<div style={{ borderBottom: '1px solid' }}>
			<div
				style={{
					display: 'flex',
					flexFlow: 'row wrap',
					justifyContent: 'space-between',
					maxWidth: '1024px',
					margin: '0 auto',
				}}
			>
				<Logo />

				<MenuContainer>
					<StyledNavLink to="/join">Join</StyledNavLink>
					{isAuthenticated && <StyledNavLink to="/create">Create</StyledNavLink>}

					<SettingsIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />

					<ProfileIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} isAuthenticated={isAuthenticated} />
				</MenuContainer>
			</div>
		</div>
	)
}
