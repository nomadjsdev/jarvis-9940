import React from 'react'

const ExternalLink = ({ link, children }) => {
	return (
		<a href={link} target="_blank" rel="noreferrer noopener nofollow">
			{children}
		</a>
	)
}

export default ExternalLink
