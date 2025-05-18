import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Logging you in via Google...");

  useEffect(() => {
    const fetchUser = async (retries = 3) => {
      try {
        const res = await fetch("http://localhost:8080/current-user", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.name);
        localStorage.setItem("useremail", data.email);
        localStorage.setItem("profilePic", data.picture);
        console.log("login via google : ", data);
        navigate("/home");
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchUser(retries - 1), 500);
        } else {
          console.error("OAuth login failed:", err.message);
          localStorage.clear();
          setStatus("Login failed. Redirecting to login page...");
          setTimeout(() => navigate("/login"), 1500);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return <p className="text-center mt-5 text-white">{status}</p>;
}
