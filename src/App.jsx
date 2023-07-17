import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Success from "./components/Success";
// import CompleteProfile2 from "./components/CompleteProfile2";
import PersonalInformation from "./components/PersonalInformation";
import CompleteProfile2 from "./components/CompleteProfile2";
import SuggestedScholarships from "./components/SuggestedScholarships";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/login/suggested-scholarship"
                element={<SuggestedScholarships />}
              />
              <Route
                path="/complete-profile/:var1/:var2/suggested-scholarship"
                element={<SuggestedScholarships />}
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/complete-profile/:var1/:var2"
                element={<CompleteProfile2 />}
              />
              <Route
                path="personal-information"
                element={<PersonalInformation />}
              />
              <Route path="/success" element={<Success />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
