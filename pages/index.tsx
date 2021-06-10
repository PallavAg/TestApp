import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Loader from "../components/Loader";
import {useContext} from "react";
import {UserContext} from "../lib/context";

export default function Home() {
    const {user, username} = useContext(UserContext)

    return (
        <div>
            <main>
                {user ? <h1>Welcome! You are logged in.</h1>: <h1>Hello. Please Log In.</h1>}
            </main>
        </div>
    );
}
