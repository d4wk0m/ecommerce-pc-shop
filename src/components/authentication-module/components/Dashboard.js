import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    async function handleLogout() {
        setError('');
        try{
            await(
                logout()
            )
            Navigate('/login')
        } catch{
            setError("Failed to log out")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h3>Current User: </h3>
                    <p>{currentUser && currentUser.email}</p>
                    <Link to={'/update-profile'}>Update profile</Link>
                </Card.Body>
            </Card>
            <div>
                <Button variant='link' onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}
