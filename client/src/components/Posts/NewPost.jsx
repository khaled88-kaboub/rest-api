import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/posts");
    } catch (error) {
      console.error("Erreur lors de l’ajout du post :", error);
    }
  };

  return (
    <div className="new-post-container">
      <h2 className="new-post-title">📝 Créer un nouvel article</h2>
      <form onSubmit={handleSubmit} className="new-post-form">
        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre de votre article"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contenu</label>
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Rédigez le contenu ici..."
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Publier
        </button>
      </form>

      <a href="/" className="back-link">
        ← Retour à la liste
      </a>
    </div>
  );
};

export default NewPost;
