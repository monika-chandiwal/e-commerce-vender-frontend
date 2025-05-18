import React, { useState, useContext } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  InputGroup,
  Nav,
} from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./pages.css";
import NavbarComponent from "../Common/Navbar";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../Common/ThemeContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const updatePassword = () => {
    console.log("password updated");
  };

  // Handle manual login
  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear old error

    try {
      const response = await fetch("http://localhost:8080/vender/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const vender = await response.json();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", vender.username);
      localStorage.setItem("useremail", vender.email);
      console.log("Manual login ", vender);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  // Google OAuth login handler
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google?prompt=select_account";
  };

  return (
    <>
      <NavbarComponent />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center signup bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Form
          onSubmit={loginUser}
          className="p-4 rounded bg-secondary"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <h3 className="text-center mb-5">Login</h3>

          {/* Error Message */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Email */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                type="email"
                placeholder="Email"
                className="bg-dark text-white border-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          {/* Password */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <InputGroup
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: ".375rem",
                  boxShadow: isFocused
                    ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                    : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-dark text-white border-light"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{ border: "none", boxShadow: "none" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    backgroundColor: "#212529",
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </InputGroup.Text>
              </InputGroup>
              <Nav.Link
                className="forgotPassword"
                onClick={updatePassword}
                variant={theme}
              >
                Forgot password
              </Nav.Link>
            </Col>
          </Form.Group>

          {/* Login Button */}
          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-center">
              <Button variant={theme} type="submit">
                Login
              </Button>
            </Col>
          </Form.Group>

          {/* Signup Link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Nav.Link
              href="/signup"
              style={{ display: "inline", color: "black" }}
            >
              Signup
            </Nav.Link>
          </p>

          {/* Google OAuth Button */}
          <div className="text-center mt-3">
            <Button onClick={handleGoogleLogin} variant={theme}>
              <FcGoogle /> Continue with Google
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
