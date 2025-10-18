import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // 🔹 Charger les posts au montage
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  };

  // 🔹 Supprimer un post
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Es-tu sûr de vouloir supprimer ce post ?");
    if (!confirmation) return;
  
    try {
      const token = localStorage.getItem("token"); // ✅ Récupère le token
      if (!token) {
        alert("Tu dois être connecté pour supprimer un post !");
        return;
      }
  
      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Envoi du token au backend
        },
      });
  
      setPosts(posts.filter((p) => p._id !== id));
      alert("✅ Post supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Erreur lors de la suppression : " + err.response?.data?.message);
    }
  };
  

  return (
    <div className="postlist-container">
      <h1 className="postlist-title">📚 Liste des articles</h1>

      <div className="post-actions-top">
        <Link to="/new" className="btn-add">
          ➕ Ajouter un post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">Aucun article disponible pour le moment.</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h2>{post.title}</h2>
              <p className="posts-date">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="posts-content">
                {post.content.length > 120
                  ? post.content.slice(0, 120) + "..."
                  : post.content}
              </p>
              <div className="post-actions">
                <Link to={`/posts/${post._id}`} className="btn-view">
                  Détails...
                </Link>
                <Link to={`/edit/${post._id}`} className="btn-edit">
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn-delete"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
