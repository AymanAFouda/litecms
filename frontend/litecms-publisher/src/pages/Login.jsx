import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isPublisherLoggedIn } from "../utils/publisherAuth";
import { useLogin } from "../hooks/useLogin";

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading, error } = useLogin();

    useEffect(() => { 
        document.title = "Login - LiteCMS" 
    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    if (isPublisherLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        login(username, password);
    }

    return(
        <div className="login-bg">
            <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
                <div className="row justify-content-center w-100">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
                        
                        <div className="card shadow-lg border-0" id="loginCard">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <img src="/images/logo.png" alt="LiteCMS logo" className="login-logo"/>
                                    </div>
                                </div>

                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label text-muted">Username</label>
                                        <div className="input-group login-input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                            <i className="fas fa-user text-muted"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                className="form-control border-start-0 ps-0" 
                                                id="username"
                                                name="username"
                                                placeholder="Enter your username" 
                                                required
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-muted">Password</label>
                                        <div className="input-group login-input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="fas fa-lock text-muted"></i>
                                            </span>
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                className="form-control 
                                                border-start-0 ps-0" 
                                                id="password" 
                                                name="password"
                                                placeholder="Enter your password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                />
                                            <button className="btn btn-outline-secondary border-start-0" type="button" id="togglePassword" onClick={togglePasswordVisibility}>
                                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} id="eyeIcon"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="d-flex justify-content-center">
                                            <p className="text-sm text-red-600">{error}</p>
                                        </div>
                                    )}

                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                            {loading ? "Logging in..." : "Login"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-light opacity-75 mb-2">
                                <i className="bi bi-c-circle"></i> 2026 LiteCMS - All Rights Reserved.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}