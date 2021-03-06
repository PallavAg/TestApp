import {auth, firestore, googleAuthProvider} from "../lib/firebase";
import {useContext, useEffect} from "react";
import {UserContext} from "../lib/context";
import {toast} from "react-hot-toast";
import firebase from "firebase";

export default function EnterPage({}) {
    const {user, username} = useContext(UserContext)

    if (!user) {
        useEffect(verifyEmailLink, [])
    }

    return (
        <main>
            <h1>Sign In Options</h1>
            {user ? <SignOutButton/> : <> <SignInButton/> <SignInEmailButton/> </>}
        </main>
    )
}

function verifyEmailLink() {

    if (auth.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }

        // The client SDK will parse the code from the link
        auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
                toast.success("Logged in Successfully") // Todo: Occurs Multiple Times
                createFirestoreEntry(result)
                // You can access the new user via result.user
                // You can check if the user is new or existing: result.additionalUserInfo.isNewUser
            })
            .catch((error) => {
                toast.error(`${error.message}`); // Action Code Malformed Error
            });
    }
}

function createFirestoreEntry(result: firebase.auth.UserCredential) {
    // Create user in firestore
    if (result.additionalUserInfo.isNewUser) {
        firestore.collection("users").doc(result.user.uid).set({
            Birthday: "",
            Name: ""
        })
            .then(() => {
                toast.success("User created on firestore")
            })
            .catch((error) => {
                toast.error("Uh Oh: " + error.message)
            });
    }
}

// Sign in with Google
function SignInButton() {

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
            .then((result) => {
                // Create firestore entry if new user
                createFirestoreEntry(result);
                toast.success('Signed in Successfully');
            })
            .catch((error) => {
                toast.error(`${error.message}`);
            });
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={'/google.png'} alt={""}/> Sign in with Google
        </button>
    );

}

// Sign in with Email
function SignInEmailButton() {

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        url: 'http://localhost:3000/enter',
        // This must be true.
        handleCodeInApp: true,
    };

    const signInWithEmail = async () => {
        const emailInput = prompt('Please enter your email')

        if (emailInput != null) {
            auth.sendSignInLinkToEmail(emailInput, actionCodeSettings)
                .then(() => {
                    toast.success("Email Sent to " + emailInput)
                    // Save the email locally so you don't need to ask the user for it again
                    window.localStorage.setItem('emailForSignIn', emailInput);
                })
                .catch((error) => {
                    toast.error(`${error.message}`);
                });
        }
    };

    return (
        <button className="btn-google" onClick={signInWithEmail}>
            <img src={'/mail.png'} alt={""}/> Sign in with Email
        </button>
    );

}

// Sign out
function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}


function UsernameForm() {

}