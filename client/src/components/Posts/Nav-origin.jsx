import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* 🔷 Logo / Titre */}
        <Link to="/" className="nav-logo">
          <span>📰</span> Maintenance Industrielle Blog
        </Link>

        {/* 🔗 Liens principaux */}
        <ul className="nav-links">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          {token && (
            <li>
              <Link to="/new" className="btn-add">
                + Ajouter un post
              </Link>
            </li>
          )}
        </ul>

        {/* 🔐 Auth */}
        <div className="nav-auth">
          {!token ? (
            <>
              <Link to="/login" className="btn-login">
                Connexion
              </Link>
              <Link to="/register" className="btn-register">
                Inscription
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
