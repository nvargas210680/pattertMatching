import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/complete-profile/${firstName}/${lastName}`);
  };

  const handleProvinceChange = (e) => {
    try {
      setError("");
      setSelectedProvince(e.target.value);
    } catch {
      setError("Failed to select province");
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Personal Information</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <input
              id="firstname"
              type="text"
              value={firstName}
              required
              placeholder="Firstname"
              className="form-control my-4"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              id="lastName"
              type="text"
              value={lastName}
              required
              placeholder="LastName"
              className="form-control my-4"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Province of Study</label>
            <select onChange={(e) => handleProvinceChange(e)}>
              <option>Alberta</option>
              <option>British Columbia</option>
              <option>Manitoba</option>
              <option>New Brunswick</option>
              <option>Newfoundland and Labrador</option>
              <option>Northwest Territories</option>
              <option>Nova Scotia</option>
              <option>Nunavut</option>
              <option>Ontario</option>
              <option>Prince Edward Island</option>
              <option>Quebec</option>
              <option>Saskatchewan</option>
              <option>Yukon</option>
            </select>
            <Button className="w-100 mt-4" onClick={handleNavigate}>
              Next Page
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PersonalInformation;
