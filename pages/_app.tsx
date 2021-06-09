import '../styles/globals.css'
import Navbar from "../components/Navbar";
import {Toaster} from "react-hot-toast";
import {UserContext} from "../lib/context";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../lib/firebase";
import {useEffect} from "react";

function MyApp({Component, pageProps}) {
    // useAuthState() listen to current user
    const [user] = useAuthState(auth)

    // useEffect(() => {
    //     let unsubscribe;
    //     if (user) {
    //         const ref = firestore.collection('users').doc(user.uid)
    //         unsubscribe = ref.onSnapshot({});
    //     }
    //     return unsubscribe;
    // }, [user]);

    return (
        <UserContext.Provider value={{user, username: 'Pallav'}}>
            <Navbar/>
            <Component {...pageProps} />
            <Toaster/>
        </UserContext.Provider>
    )
}

export default MyApp
