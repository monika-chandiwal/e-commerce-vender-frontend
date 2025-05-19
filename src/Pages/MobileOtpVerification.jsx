import { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../Common/ThemeContext";

export default function MobileOtpVerification() {
  const { theme } = useContext(ThemeContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const requestOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/vendor/otpVerification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ phoneNumber }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send OTP");
      }

      const data = await response.json();
      console.log("OTP sent successfully:", data);

      setSentOtp(true); // mark OTP as sent only on success
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      console.log("otp verified");
      navigate("/signup");
    } catch (e) {
      console.log("error : ", e);
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center signup bg-dark text-white"
      style={{ minHeight: "100vh" }}
    >
      <Form
        noValidate
        className="p-4 rounded bg-secondary"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Form.Group
          controlId="formGroupphone"
          className="mb-4 justify-content-center"
        >
          <Form.Label>Phone Number : </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter phone number"
            isInvalid={isInvalid}
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setPhoneNumber(value);

              if (value.length !== 10) {
                setIsInvalid(true);
              } else {
                setIsInvalid(false);
              }
            }}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Phone number must be exactly 10 digits.
          </Form.Control.Feedback>
          <Button
            disabled={isInvalid}
            variant={theme}
            onClick={requestOtp}
            className="mt-3"
          >
            Request OTP
          </Button>
        </Form.Group>

        {sentOtp && (
          <Form.Group className="mb-3" controlId="formGroupphone">
            <Form.Label>OTP : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button className="mt-3" variant={theme} onClick={verifyOtp}>
              Verify OTP
            </Button>
          </Form.Group>
        )}
      </Form>
    </Container>
  );
}
