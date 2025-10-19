import { Routes, Route, Link } from "react-router-dom";
import EditPost from "./components/Posts/EditPost";
import PostList from "./components/Posts/PostList";
import PostDetail from "./components/Posts/PostDetail";
import NewPost from "./components/Posts/NewPost";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Layout/Navbar";
import Splash from "./components/Layout/Splash";

import "./App.css";


export default function App() {
  const { user, loginLocal, logoutLocal } = useAuth();

  return (
    <>


      <Navbar/>

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login onLogin={loginLocal} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
