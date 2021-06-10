import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {auth, firestore, googleAuthProvider} from "../lib/firebase";
import {toast} from "react-hot-toast";

export default function Home() {
    const {user, username} = useContext(UserContext)

    let [name, setName] = useState("")
    let [bday, setBday] = useState("")

    const editName = () => {
        const nameInput = prompt('Please provide your full name')
        if (user != null && nameInput != null && nameInput.length != 0) {
            const userDoc = firestore.collection("users").doc(user.uid);
            userDoc.set({
                Name: nameInput
            }, {merge: true}).then(() => {
                setName(nameInput) // Update name on UI
            }).catch((error) => {
                toast.error("Unable to update name. " + error.message)
            });
        }
    }

    const editBday = () => {
        const bdayInput = prompt('Please provide your Birthday')
        if (user != null && bdayInput != null && bdayInput.length != 0) {
            const userDoc = firestore.collection("users").doc(user.uid);
            userDoc.set({
                Birthday: bdayInput
            }, {merge: true}).then(() => {
                setBday(bdayInput) // Update name on UI
            }).catch((error) => {
                toast.error("Unable to update birthday. " + error.message)
            });
        }
    }

    const editPic = () => {
    }

    function ProfileItems() {
        if (user != null) {
            const userDoc = firestore.collection("users").doc(user.uid);
            userDoc.get().then((doc) => {
                if (doc.exists) {
                    setBday(doc.data().Birthday)
                    setName(doc.data().Name)
                } else {
                    console.log("Error finding user on firestore")
                }
            })
        }

        return (
            <main>
                <h1>Profile Page</h1>
                <h2>Name: {name}</h2>
                <button onClick={editName} className="btn-blue">Update Name</button>
                <br/>
                <h2>Birthday: {bday}</h2>
                <button onClick={editBday} className="btn-blue">Update Birthday</button>
                <br/>
                <button onClick={editPic} className="btn-blue">Edit Profile Picture</button>
            </main>
        );
    }

    return (
        <div>
            {user && (<ProfileItems/>)}

            {!user && (
                <main>
                    <h1>Please Log In to edit your profile</h1>
                </main>
            )}

        </div>
    );
}
