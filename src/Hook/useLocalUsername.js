import { useState, useEffect } from 'react'

const useLocalUsername = () => {
	const [localUsername, setLocalUsername] = useState(localStorage.getItem('localUsername'))
	useEffect(() => {
		if (localUsername !== localStorage.getItem('localUsername')) {
			localStorage.setItem('localUsername', localUsername)
		}
	}, [localUsername])

	return [localUsername, setLocalUsername]
}

export default useLocalUsername
