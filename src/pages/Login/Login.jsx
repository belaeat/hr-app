import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ loginHandler }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      loginHandler();
      navigate("/");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        <label className={styles.employeeForm_label}>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className={styles.employeeForm_input}
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className={styles.employeeForm_input}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
