import { LAST_UPDATED } from 'Utils/Constants'

export const getCacheItem = key => {
	const data = JSON.parse(localStorage.getItem(key)) || null

	return data?.lastUpdated === LAST_UPDATED ? data : null
}

export const setCacheItem = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data))
}
