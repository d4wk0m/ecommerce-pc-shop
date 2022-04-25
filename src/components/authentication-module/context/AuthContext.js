import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider  } from "firebase/auth";

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    var [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const value = { 
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        loginGoogle,
        loginFacebook,
        loginGithub
     }

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return auth.currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return auth.currentUser.updatePassword(password);
    }

    function loginGoogle(){
        return auth.signInWithPopup(providerGoogle);
    }

    function loginFacebook(){
        return auth.signInWithPopup(providerFacebook);
    }

    function loginGithub(){
        return auth.signInWithPopup(providerGithub);
    }

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
