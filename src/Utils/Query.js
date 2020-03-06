import myFirebase from 'Service/Firebase'

export const Fetch = async ref => {
	const result = await myFirebase
		.database()
		.ref(ref)
		.once('value')
		.then(snapshot => snapshot.val())

	return result
}

export const Update = async (ref, data) => {
	const result = await myFirebase
		.database()
		.ref(ref)
		.update(data)

	return result
}
