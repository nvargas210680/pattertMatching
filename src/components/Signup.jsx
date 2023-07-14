import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/success");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              ref={emailRef}
              required
              placeholder="Email"
              className="form-control my-4"
            />
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
              placeholder="Password"
              className="form-control my-4"
            />
            <input
              id="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              required
              placeholder="Confirm your password"
              className="form-control my-4"
            />
            <Button
              disabled={loading}
              className="w-100 mt-4"
              onClick={handleSubmit}
              type="submit"
            >
              Next Page
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
