import React from "react";
import { RegisterComponent } from "../components/RegisterComponent";
import { registerUser } from "../utils/user.api";
import { useNavigate } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await registerUser(username, email, password);
      console.log("Registration success:", response);
      localStorage.setItem("token", response.token); // Save token to localStorage
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      // show user an error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <RegisterComponent onRegister={handleRegister} />
      </div>
    </div>
  );
};
