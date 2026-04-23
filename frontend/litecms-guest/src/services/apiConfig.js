export const API_BASE_URL =
  window.location.hostname === "10.0.2.2"
    ? "http://10.0.2.2:8080/api"
    : "http://localhost:8080/api";

export const UPLOADS_BASE_URL =
  window.location.hostname === "10.0.2.2"
    ? "http://10.0.2.2:8080"
    : "http://localhost:8080";