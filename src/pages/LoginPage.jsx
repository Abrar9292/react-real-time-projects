import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = () => {
        if (
            registerData.name === "" ||
            registerData.email === "" ||
            registerData.password === "" ||
            registerData.confirmPassword === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        if (registerData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        localStorage.setItem(
            "registeredUser",
            JSON.stringify({
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
            })
        );

        alert("Account created successfully. Please login now.");

        setIsRegister(false);

        setLoginData({
            email: registerData.email,
            password: "",
        });

        setRegisterData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleLogin = () => {
        if (loginData.email === "" || loginData.password === "") {
            alert("Please fill all fields");
            return;
        }

        const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

        if (!savedUser) {
            alert("No account found. Please register first.");
            return;
        }

        if (
            loginData.email === savedUser.email &&
            loginData.password === savedUser.password
        ) {
            onLogin();
            navigate("/");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                {!isRegister ? (
                    <>
                        <h1>Login</h1>
                        <p>Please login to open project modules</p>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />

                        <button onClick={handleLogin}>Login</button>

                        <p className="auth-switch-text">
                            Don&apos;t have an account?
                            <span onClick={() => setIsRegister(true)}>
                                Register New
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Register</h1>
                        <p>Create your account to access projects</p>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Full Name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={registerData.confirmPassword}
                            onChange={handleRegisterChange}
                        />

                        <button onClick={handleRegister}>Create Account</button>

                        <p className="auth-switch-text">
                            Already have an account?
                            <span onClick={() => setIsRegister(false)}>
                                Login Here
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginPage;