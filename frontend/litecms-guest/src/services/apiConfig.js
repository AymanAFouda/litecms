export const API_BASE_URL =
    window.location.hostname === "10.0.2.2"
        ? "http://10.0.2.2:8080/api"
        : window.location.hostname === "localhost"
        ? "http://localhost:8080/api"
        : "http://192.168.1.111:8080/api";

export const UPLOADS_BASE_URL =
    window.location.hostname === "10.0.2.2"
        ? "http://10.0.2.2:8080"
        : window.location.hostname === "localhost"
        ? "http://localhost:8080"
        : "http://192.168.1.111:8080";