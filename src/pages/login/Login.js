import "./login.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import PersonIcon from "@mui/icons-material/Person";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h3 className="login-header">Log In</h3>
        <div>
          <PersonIcon
            className="avatar-icon"
            sx={{ height: "40px", width: "40px" }}
          >
            {" "}
          </PersonIcon>
        </div>

        <label className="label">Email:</label>
        <input
          className="input"
          placeholder="Username"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="label">Password:</label>
        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="login-button" disabled={isLoading}>
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
export default Login;
