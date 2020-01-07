import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import * as Config from './config'

// Add your Firebase credentials
export default firebase.initializeApp({
	apiKey: Config.apiKey,
	authDomain: Config.authDomain,
	databaseURL: Config.databaseUrl,
	projectId: Config.projectId,
	storageBucket: Config.storageBucket,
	messagingSenderId: Config.messagingSenderId,
	appId: Config.appId,
	measurementId: Config.measurementId,
})
