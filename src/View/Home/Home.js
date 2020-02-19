import React from 'react'
import { Link } from 'react-router-dom'

import { colors, typography } from 'Styles'

import { MainHeader, SubHeader } from './Home.styles'

const Home = () => {
	return (
		<div>
			<MainHeader>Jarvis 99-40</MainHeader>
			<SubHeader>A visual interface for gamers who play without sound</SubHeader>
			<p>
				<Link to="/join">Get started -></Link>
			</p>
			<p>
				<Link to="/">What is this?</Link>
			</p>
		</div>
	)
}

export default Home
