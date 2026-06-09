import { useState } from "react";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        alert("Login Successful");
        console.log(formData);
    };

    return (
        <div className="login-container">

            <h2>Login Form</h2>

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>
                Login
            </button>

        </div>
    );
}

export default Login;