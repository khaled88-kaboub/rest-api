import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">📝 Inscription</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
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
        <button type="submit" className="register-button">
          S'inscrire
        </button>
      </form>
      <a href="/login" className="login-link">
        Déjà un compte ? Connectez-vous
      </a>
    </div>
  );
};

export default Register;
