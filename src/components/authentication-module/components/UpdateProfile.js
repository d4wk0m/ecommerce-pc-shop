import {React, useEffect, useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { useDatabase } from '../../products/context/DatabaseContext';

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail, logout } = useAuth();
    const { changeMail } = useDatabase();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser.providerData[0].providerId === 'password'){
            setDisabled(false)
        }
    },[currentUser.providerData])
    
    function updateProfile(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords don't match")
        }
        setError("");
        setLoading(true);
        const promises = [];

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
            promises.push(changeMail(currentUser.uid, emailRef.current.value))
        }

        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises)
            .then(() => {
                logout();
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
                var errm = err.message.slice(10).split(' ').slice(0, -1).join(' ')
                setError("Failed to update account: " + errm)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={updateProfile}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} disabled={disabled}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div>
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile;
