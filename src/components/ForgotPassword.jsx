import {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../contexts/AuthProvider'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    

    const handleSubmit = async(e) => {
        e.preventDefault()
    
        try{
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instruction')
        }catch{
            setError('Failed to reset password')
        }
        setLoading(false)
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='Success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <input id='email' type='email' ref ={emailRef} required  placeholder='Email' className="form-control my-4"/>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
            </Form>
            <div className="w-100 text-center mt-2">
                <Link to='/login'>Log In</Link>
    </div>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
}

export default ForgotPassword