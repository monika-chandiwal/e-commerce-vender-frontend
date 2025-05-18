import React from "react";
import { Container, Nav, Image } from "react-bootstrap";
import ThemeContext from "../Common/ThemeContext";
import { useContext } from "react";

import {
  WhatsApp,
  LinkedIn,
  Gmail,
  GitHub,
  Map,
} from "../../../frontend/public/icons.jsx";
import "../Pages/pages.css";

export default function FooterComponent() {
  const { theme } = useContext(ThemeContext);

  return (
    <Container
      bg={theme}
      variant={theme}
      fluid
      className="footer-container p-0 m-0"
      style={{
        color: theme == "dark" ? "black" : "white",
        position: "absolute",
        bottom: 0,
      }}
    >
      <div
        className="polygon-footer"
        style={{ background: theme == "light" ? "#444" : "#f3f0f0" }}
      >
        <div className="ContactIcons banner-footer-bg">
          <Nav.Link href="https://github.com/monika-chandiwal">
            <GitHub />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/monika-chandiwal-45118724a/">
            <LinkedIn />
          </Nav.Link>
          <Nav.Link href="whatsapp://send?phone=917877958719&text=Hello">
            <WhatsApp />
          </Nav.Link>
          <Nav.Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=monikachandiwal04@gmail.com&su=Test%20Email&body=Your message"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Gmail />
          </Nav.Link>
          <Nav.Link href="/aboutUs" target="_blank" rel="noopener noreferrer">
            <Map />
          </Nav.Link>
        </div>

        <div>
          <p>© 2025 All rights reserved</p>
        </div>
      </div>
    </Container>
  );
}
