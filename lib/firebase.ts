import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADxNyqraTZXf_dTJKd8_mfcqnj_SUDQQw",
    authDomain: "nextfire-789d7.firebaseapp.com",
    projectId: "nextfire-789d7",
    storageBucket: "nextfire-789d7.appspot.com",
    messagingSenderId: "692137946226",
    appId: "1:692137946226:web:09149e23470d883888a6eb",
    measurementId: "G-NE4YMV36D7"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();