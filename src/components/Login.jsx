import { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [matchedScholarships, setMatchedScholarships] = useState([]);
  const navigate = useNavigate();
  const { var1, var2 } = useParams();

  const handleUserData = async () => {
    try {
      const userProfileRef = doc(db, "user_profile", currentUser.uid);
      const userProfileDoc = await getDoc(userProfileRef);

      if (userProfileDoc.exists()) {
        const userProfileData = userProfileDoc.data();
        console.log("User data retrieved:", userProfileData);

        // Find collection based on selected tags
        const q = query(
          collection(db, "scholarships2"),
          where("tag", "in", userProfileData.tags)
        );

        const querySnapshot = await getDocs(q);

        const matchedScholarships = [];
        querySnapshot.forEach((doc) => {
          const scholarshipData = doc.data();
          matchedScholarships.push(scholarshipData);
        });

        setMatchedScholarships(matchedScholarships);
      }

      navigate("suggested-scholarship");
    } catch (error) {
      console.error("Error retrieving user data from Firebase:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      handleUserData();
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="Email"
                className="my-4"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                placeholder="Password"
                className="my-4"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      {matchedScholarships.length > 0 && (
        <div>
          <h3>Matched Scholarships:</h3>
          <ul>
            {matchedScholarships.map((scholarship) => (
              <li key={scholarship.id}>{scholarship.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Login;
