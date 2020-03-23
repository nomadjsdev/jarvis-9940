import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import { SubmitButton } from 'Component/Global/Form'
import LocalUsernameForm from 'Component/LocalUsernameForm'
import ChangeColorSettings from 'Component/ChangeColorSettings'

import ImgSrc from 'Assets/Images/robot.64.png'
import SettingsImg from 'Assets/Images/settings.64.png'
import ProfileImg from 'Assets/Images/profile.64.png'

import {
	NavbarContainer,
	StyledNavLink,
	MenuContainer,
	DropdownContainer,
	LogoImg,
	LogoText,
	HeaderImgContainer,
	HeaderImg,
} from './Navbar.styles'

const Logo = () => (
	<Link to="/">
		<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
			<LogoImg src={ImgSrc} />
			<LogoText>Jarvis 99-40</LogoText>
		</div>
	</Link>
)

const LocalUsername = () => {
	const localUsername = useSelector(state => state.user.localUsername)
	const [changeUsername, setChangeUsername] = React.useState(false)

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
	const [changeColorSettings, setChangeColorSettings] = React.useState(false)

	return (
		<React.Fragment>
			{changeColorSettings && <ChangeColorSettings modalIsOpen={setChangeColorSettings} />}

			<HeaderImgContainer>
				<HeaderImg
					src={SettingsImg}
					onClick={() => {
						setMenuIsOpen(prevState => (prevState === 'settings' ? null : 'settings'))
					}}
				/>
				<DropdownContainer isOpen={menuIsOpen === 'settings'}>
					<ColorblindMode setChangeColorSettings={setChangeColorSettings} setMenuIsOpen={setMenuIsOpen} />
				</DropdownContainer>
			</HeaderImgContainer>
		</React.Fragment>
	)
}

const ProfileIcon = ({ menuIsOpen, setMenuIsOpen, isAuthenticated }) => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)

	return (
		<HeaderImgContainer>
			<HeaderImg
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
		</HeaderImgContainer>
	)
}

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const [menuIsOpen, setMenuIsOpen] = React.useState(null)
	let location = useLocation()
	React.useEffect(() => {
		setMenuIsOpen(null)
	}, [location])

	return (
		<NavbarContainer>
			<Logo />

			<MenuContainer>
				<StyledNavLink to="/join">Join</StyledNavLink>
				{isAuthenticated && <StyledNavLink to="/create">Create</StyledNavLink>}

				<SettingsIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />

				<ProfileIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} isAuthenticated={isAuthenticated} />
			</MenuContainer>
		</NavbarContainer>
	)
}

export default Navbar
