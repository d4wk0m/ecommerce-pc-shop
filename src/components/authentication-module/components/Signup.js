import {React, useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, loginFacebook, loginGoogle, loginGithub } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords don't match")
        }

        try{
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/loading')
        } catch (err){
            var errm = err.message.slice(10).split(' ').slice(0, -1).join(' ')
            setError("Failed to create an account: " + errm)
            setLoading(false)
        }
    }

    async function handleGoogleSignup(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await loginGoogle()
            navigate('/loading')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    async function handleFacebookSignup(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await loginFacebook()
            navigate('/loading')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    async function handleGithubSignup(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await loginGithub()
            navigate('/loading')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleSignup}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>Sign Up</Button>
                    </Form>
                    <Button onClick={handleGoogleSignup}>Google</Button>
                    <Button onClick={handleFacebookSignup}>Facebook</Button>
                    <Button onClick={handleGithubSignup}>Github</Button>
                </Card.Body>
            </Card>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Signup;
