import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Loader from "../components/Loader";
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {firestore} from "../lib/firebase";

export default function Home() {
    const {user, username} = useContext(UserContext)

    let [name, setName] = useState("")

    if (user != null) {
        const userDoc = firestore.collection("users").doc(user.uid);
        userDoc.get().then((doc) => {if (doc.exists) setName(doc.data().Name)})
    }

    return (
        <div>
            <main>
                {user ? <h1>Welcome {name.substring(0, name.indexOf(" "))}! You are logged in.</h1> : <h1>Hello. Please Log In.</h1>}
            </main>
        </div>
    );
}
