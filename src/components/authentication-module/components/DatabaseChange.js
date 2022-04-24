import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useDatabase } from '../../products/context/DatabaseContext'
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../../products/context/DatabaseContext';

export default function DatabaseLogin() {
    // const { getUser, setUser} = useDatabase();
    const { currentUser } = useAuth();
    const { checkUser } = useDatabase()
    const navigate = useNavigate();

    useEffect(() => {
        async function userAdd(){
            await checkUser(currentUser.uid, currentUser.email)
        }
        userAdd()
        window.setTimeout(() => {
            navigate('/')
        }, 1000) 
    }, [])
    return (
        <>
            <div className="d-flex justify-content-center align-items-centr w-100" style={ {minHeight:"100vh"}}>
                <h2>{ currentUser.email }</h2>
            </div>
        </>
    )
}
