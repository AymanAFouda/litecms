import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { savePublisherAuth } from "../utils/publisherAuth";

const API_BASE = "http://localhost:8080";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/publisher";

  const login = async (username, password) => {
    setError("");
    setLoading(true);

    const authHeader = "Basic " + btoa(`${username}:${password}`);

    try {
      const response = await fetch(`${API_BASE}/api/publisher/auth/me`, {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      savePublisherAuth(authHeader);
      navigate(from, { replace: true });

    } catch (err) {
      setError("Login failed. Please check your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}