import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Form, Card } from "react-bootstrap";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ThemeContext from "./ThemeContext";
import "./Navbar.css";
import { IoBagAdd } from "react-icons/io5";

export default function NavbarComponent() {
  const [query, setQuery] = useState("");
  const [showCard, setShowCard] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cardRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const fullName = localStorage.getItem("username") || "";
  const email = localStorage.getItem("useremail") || "";
  const id = localStorage.getItem("id");
  const profilePic = localStorage.getItem("profilePic");
  const [profile, setProfile] = useState("");

  console.log(profile);

  //console.log({ profilePic });
  // const initials = fullName
  //   .split(" ")
  //   .map((n, i) => (i < 2 ? n[0] : ""))
  //   .join("")
  //   .toUpperCase();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/vendor/logout", {
        method: "GET",
        credentials: "include",
      });
      console.log("logout", localStorage.getItem("name"));
      localStorage.clear();
      navigate("/vendor/login"); // this is frontend redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleOutsideClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setShowCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleProfileClick = () => {
    setShowCard((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
  };

  return (
    <Navbar
      expand="md"
      bg={theme}
      variant={theme}
      style={{
        minWidth: "100%",
      }}
    >
      {" "}
      <Container fluid className="mx-2 ">
        <Navbar.Brand href="/">StyliQue</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center w-100">
            <Nav.Link href="/">Sell</Nav.Link>
            <Nav.Link href="/women">Success Stories</Nav.Link>
            <Nav.Link href="/women">Services</Nav.Link>

            <Nav.Link href="/kids">FAQs</Nav.Link>
          </Nav>
          <Nav className="flex-d justify-content-center align-items-center">
            {isLoggedIn ? (
              <Nav.Link
                href={`/vendor/addProduct?id=${localStorage.getItem("id")}`}
                className=" loginUserProperty"
              >
                <IoBagAdd
                  style={{
                    paddingBottom: "5px",
                    width: "30px",
                    height: "20px",
                  }}
                />
                Add New Product To Your Shop
              </Nav.Link>
            ) : (
              ""
            )}

            {!isLoggedIn ? (
              <Nav.Link href="/vendor/login" style={{ float: "right" }}>
                <FaRegUserCircle className="spinning-icon" /> Login
              </Nav.Link>
            ) : (
              <div className="position-relative" style={{ float: "right" }}>
                <div onClick={handleProfileClick}>
                  {profilePic == null ? (
                    <p className="loginUserProperty">Welcome, {fullName}</p>
                  ) : (
                    <img
                      src={profilePic}
                      style={{ maxWidth: "1rem" }}
                      className="imgProperty"
                    />
                  )}
                </div>

                {showCard && (
                  <Card
                    ref={cardRef}
                    className="position-absolute mt-2 "
                    style={{
                      right: 0,
                      zIndex: "999",
                      minWidth: "15rem",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Card.Body>
                      {profilePic != null ? (
                        <img src={profilePic} className="imgProperty" />
                      ) : (
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Add profile picture
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Form.Group>
                              <Form.Label htmlFor="hiddenFileInput">
                                <FiUserPlus
                                  size={30}
                                  style={{
                                    border: "1px solid gray",
                                    borderRadius: "2rem",
                                    cursor: "pointer",
                                  }}
                                  className="m-2 p-1"
                                />
                              </Form.Label>
                              <Form.Control
                                type="file"
                                id="hiddenFileInput"
                                style={{ display: "none" }}
                                value={profile}
                                onChange={(e) => setProfile(e.target.value)}
                              />
                            </Form.Group>
                          </span>
                        </OverlayTrigger>
                      )}
                      <div>
                        <div>
                          <strong>{fullName.toUpperCase()}</strong>
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {email}{" "}
                        </div>
                      </div>
                      <div style={{ fontSize: "0.85rem" }}>
                        Your Vendor ID : <strong>{id}</strong>
                      </div>
                      <Form>
                        <Form.Check
                          className="d-flexjustify-content-center position-relative mt-2 "
                          style={{ bottom: 0 }}
                          onClick={toggleTheme}
                          type="switch"
                          id="custom-switch"
                          label={`Switch to ${
                            theme === "light" ? "Dark" : "Light"
                          } Mode`}
                        />
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        onClick={handleLogout}
                        className="btn btn-danger w-100"
                      >
                        Logout
                      </button>
                    </Card.Footer>
                  </Card>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
