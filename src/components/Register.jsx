import { useState } from "react";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {

    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = () => {

    if (
      user.name === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be 6 characters");
      return;
    }

    alert("Registration Successful");

    console.log(user);
  };

  return (
    <div className="register-container">

      <h2>Register Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={user.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleChange}
      />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  );
}

export default Register;