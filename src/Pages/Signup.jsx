import React, { useState, useContext } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../Common/ThemeContext";
import NavbarComponent from "../Common/Navbar";
import { FcGoogle } from "react-icons/fc";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Signup() {
  const query = new URLSearchParams(useLocation().search);
  const phoneNumber = query.get("phone");
  //console.log(phoneNumber);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState("");
  const [address, setAddress] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const saveUser = (e) => {
    e.preventDefault();
    const vendor = { phoneNumber, name, email, password, brand, address };
    //console.log(name);
    {
      fetch("http://localhost:8080/vendor/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
      })
        .then((response) => {
          if (response.ok) {
            toast.success(`${vendor.name} signed up successfully!`, {
              position: "bottom-left",
              autoClose: 3000,
            });
            navigate("/vendor/addProduct");
          } else if (response.status === 409) {
            response.text().then((errorMessage) => {
              toast.error(`${errorMessage}, try again`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
              });
            });
          } else if (response.status === 406) {
            response.text().then((errorMessage) => {
              toast.error(`${errorMessage}, try again`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
              });
            });
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          toast.error("Something went wrong. Please try again later.", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
          });
        });
    }
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
          onSubmit={saveUser}
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center mb-5">Register</h3>

          {/* Username */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                className="bg-dark text-white border-light"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <InputGroup
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: ".375rem",
                  boxShadow: isFocused
                    ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                    : "none",
                }}
              >
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  className="bg-dark text-white border-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
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
                }}
              >
                <Form.Control
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-dark text-white border-light"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Manufactured By..."
                className="border-dark"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                as="textarea"
                placeholder="Add Manufacturer address ..."
                className="border-dark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/* Submit */}
          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-center">
              <Button variant={theme} type="submit">
                Register
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {/* Toasts & Email Verification */}
        <ToastContainer />
      </Container>
    </>
  );
}

function LoginButton() {
  return (
    <Nav.Link
      className="loginButton"
      href="/login"
      style={{ display: "inline-block", color: "black" }}
    >
      Login
    </Nav.Link>
  );
}
