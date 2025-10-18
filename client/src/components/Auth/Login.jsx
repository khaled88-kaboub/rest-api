import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username); // ← Stocke le nom d'utilisateur
      navigate("/posts");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">🔑 Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>
      <a href="/register" className="register-link">
        Pas encore de compte ? Inscrivez-vous
      </a>
    </div>
  );
};

export default Login;
