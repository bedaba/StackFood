import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: 'AIzaSyCeaw_gVN0iQwFHyuF8pQ6PbVDmSVQw8AY',
    authDomain: 'stackfood-bd3ee.firebaseapp.com',
    projectId: 'stackfood-bd3ee',
    storageBucket: 'stackfood-bd3ee.appspot.com',
    messagingSenderId: '1049699819506',
    appId: '1:1049699819506:web:a4b5e3bedc729aab89956b',
    measurementId: 'G-2QNRKR9K5R',
}
const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {

        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BG-S9AI6Ko4FJmc4eKk1gYbcx07x3ymhigGBNwFn6uNkMo5QkWor9_jVF3AY1iAjYek1nobwXR6kMoCJAuX4-hY',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {

                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {

            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {

                resolve(payload)
            })
        })()
    )
