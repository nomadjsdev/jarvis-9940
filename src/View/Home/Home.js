import React from 'react'
import { Link } from 'react-router-dom'

import { Page, PrimarySection } from 'Component/Global/Layout'

import { MainHeader, SubHeader } from './Home.styles'

const Home = () => {
	return (
		<Page>
			<PrimarySection>
				<MainHeader>Jarvis 99-40</MainHeader>
				<SubHeader>A visual interface for gamers who play without sound</SubHeader>
				<p>
					<Link to="/join">Get started -></Link>
				</p>
				<p>
					<Link to="/about">What is this?</Link>
				</p>
			</PrimarySection>
		</Page>
	)
}

export default Home
