import {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../contexts/AuthProvider'
import { Link, useNavigate} from 'react-router-dom';


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signin } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async(e) => {
        e.preventDefault()
    
        try{
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            navigate('/');
        }catch{
            setError('Failed to log in')
        }
        setLoading(false)
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <input id='email' type='email' ref ={emailRef} required  placeholder='Email' className="form-control my-4"/>
                <input id='password' type='password' ref ={passwordRef} required  placeholder='Password' className="form-control my-4"/>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign In</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to='/forgot-password'>Forgot Password?</Link>
    </div>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
}

export default Login