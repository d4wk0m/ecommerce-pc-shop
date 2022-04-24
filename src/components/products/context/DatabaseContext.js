import React, { useContext, useRef } from "react";
import { db } from '../../firebase'
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export default function DatabaseProvider( { children } ) {
    const usersRef = useRef(collection(db, 'users'))
    console.log(usersRef)
    const value = {
        addUser,
        getUser,
        checkUser,
        changeMail,
    }

    function addUser(uid, email){
        return setDoc(doc(db, "users", uid), {email: email, UID: uid});
    }

    function getUser(uid){
        return getDoc(doc(db, 'users', uid))
    }

    async function checkUser(uid, email){
        const temp = await getDoc(doc(db, 'users', uid));
        if (temp.exists()){
            if (await getDoc(doc(db, 'users', uid), {email}) !== email){
                await updateDoc(doc(db, 'users', uid), {email: email});
                return
            }
            return
        }
        await addUser(uid, email);
        return
    }

    async function changeMail(uid, email){
        await updateDoc(doc(db, 'users', uid), {email: email});
        return
    }

    return (
        <DatabaseContext.Provider value={ value }>
            { children }
        </DatabaseContext.Provider>
    )
}
