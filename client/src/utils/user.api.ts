import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001", // Default URL if not defined in .env
});

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/api/user/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("api/user/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
