import {auth, googleAuthProvider} from "../lib/firebase";
import {useContext} from "react";
import {UserContext} from "../lib/context";
import {toast} from "react-hot-toast";

export default function EnterPage({}) {
    const {user, username} = useContext(UserContext)

    return (
        <main>
            <h1>Sign In Options</h1>
            {user ? <SignOutButton/> : <> <SignInButton/> </>}
        </main>
    )
}

// Sign in with Google
function SignInButton() {

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
            .then(() => {toast.success('Signed in Successfully');})
            .catch((error) => {toast.error(`${error.message}`);});
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={'/google.png'} alt={""}/> Sign in with Google
        </button>
    );

}

// Sign out
function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {

}