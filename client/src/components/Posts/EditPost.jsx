import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditPost.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement du post :", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/posts/${id}`,
        post,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/posts");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-title">✏️ Modifier l’article</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contenu</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>

        <button type="submit" className="save-button">
          💾 Enregistrer les modifications
        </button>
      </form>

      <a href="/posts" className="back-link">
        ← Retour à la liste
      </a>
    </div>
  );
};

export default EditPost;

