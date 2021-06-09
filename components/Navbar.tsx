import Link from 'next/link';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import {UserContext} from "../lib/context";
import {auth} from "../lib/firebase";

// Top navbar
export default function Navbar() {

    // UI will re-render when any of these values change
    const {user, username} = useContext(UserContext)

    const router = useRouter();

    const signOut = () => {
        auth.signOut();
        // router.reload();
    }

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href={"/"}>
                        <button className="btn-logo">STRIVE MATH</button>
                    </Link>
                </li>

                {/* user is signed-in */}
                {user && (
                    <>
                        <li className="push-left">
                            <button onClick={signOut}>Sign Out</button>
                        </li>
                        <li>
                            <img src={'/hacker.png'} alt={"Profile Pic"}/>
                        </li>
                    </>
                )}

                {/* user is not signed */}
                {!user && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}

            </ul>
        </nav>
    );
}