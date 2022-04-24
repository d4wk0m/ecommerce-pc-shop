import {React, useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleReset(e) {
        e.preventDefault()
        try{
            setMessage('');
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for instructions')
            window.setTimeout(() => {
                navigate('/login')
            }, 5000)
        } catch{
            setLoading(false);
            setError("Failed to reset password")
        }
    }

    return (
        <>
            {message && <Alert variant="success">{message}</Alert>}
            <Card>
                <Card.Body>
                    <h2>Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleReset}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>Reset Password</Button>
                    </Form>
                    <div>
                        <Link to={'/login'}>Log in</Link>
                    </div>
                </Card.Body>
            </Card>
            <div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
