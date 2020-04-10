import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'
import { SubmitButton } from 'Component/Global/Form'
import LocalUsernameForm from 'Component/LocalUsernameForm'
import ChangeColorSettings from 'Component/ChangeColorSettings'

import ImgSrc from 'Assets/Images/robot.64.png'
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

			<div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
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
	<div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
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
	</div>
)

const ProfileIcon = ({ menuIsOpen, setMenuIsOpen, isAuthenticated }) => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user?.details?.username)
	const [changeColorSettings, setChangeColorSettings] = React.useState(false)

	return (
		<React.Fragment>
			{changeColorSettings && <ChangeColorSettings modalIsOpen={setChangeColorSettings} />}

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
							<div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
								<SubmitButton
									type="button"
									onClick={() => {
										dispatch(logoutUser())
									}}
								>
									Logout
								</SubmitButton>
							</div>
						</React.Fragment>
					)}
					{!isAuthenticated && (
						<React.Fragment>
							<StyledNavLink to="/register">Register</StyledNavLink>
							<StyledNavLink to="/login">Login</StyledNavLink>
							<LocalUsername />
						</React.Fragment>
					)}
					<ColorblindMode setChangeColorSettings={setChangeColorSettings} setMenuIsOpen={setMenuIsOpen} />
				</DropdownContainer>
			</HeaderImgContainer>
		</React.Fragment>
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

				<ProfileIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} isAuthenticated={isAuthenticated} />
			</MenuContainer>
		</NavbarContainer>
	)
}

export default Navbar
