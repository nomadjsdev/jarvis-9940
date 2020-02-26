const getDeviceConfig = width => {
	if (width < 330) {
		return 'xs'
	} else if (width >= 330 && width < 600) {
		return 'sm'
	} else if (width >= 600 && width < 900) {
		return 'md'
	} else if (width >= 900 && width < 1200) {
		return 'lg'
	} else if (width >= 1200) {
		return 'xl'
	}
}

const useBreakpoint = () => {
	return getDeviceConfig(window.innerWidth)
}

export default useBreakpoint
