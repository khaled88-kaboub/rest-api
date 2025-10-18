import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (err) {
      console.error("Erreur de parsing du user :", err);
      return null;
    }
  });

  const loginLocal = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutLocal = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, loginLocal, logoutLocal };
}
