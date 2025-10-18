import API from "./Api";

export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data; // { token, user }
};

export const register = async (username, email, password) => {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
