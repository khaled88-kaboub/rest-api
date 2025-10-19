import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection après 3 secondes
    const timer = setTimeout(() => {
      navigate("/posts");
    }, 3000);

    return () => clearTimeout(timer); // nettoyage
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1>📝 Bienvenue sur MyBlog</h1>
     

      <img className="pic" src="/logo.jpg" alt="Logo" />
      <p>Powered by Khaled KABOUB, Chargement en cours...</p>
      <h2>All rights reserved @2025</h2>
    </div>
  );
};

export default Splash;
