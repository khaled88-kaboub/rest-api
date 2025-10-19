import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://rest-api-fd2n.onrender.com/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div className="post-detail-container">Chargement...</div>;

  return (
    <div className="post-detail-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{new Date(post.date).toLocaleString()}</p>
      <p className="post-content">{post.content}</p>

      <div className="post-actions">
        <button
          className="edit-button"
          onClick={() => navigate("/posts")}
        >
          Retour 
        </button>
        
      </div>
    </div>
  );
};

export default PostDetail;
