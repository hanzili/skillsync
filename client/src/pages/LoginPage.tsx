import React from "react";
import { LoginComponent } from "../components/LoginComponent";
import { loginUser } from "../utils/user.api";
import { useNavigate } from "react-router-dom"; // Import useHistory

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      console.log("Login success:", response);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // show user an error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <LoginComponent onLogin={handleLogin} />
      </div>
    </div>
  );
};
