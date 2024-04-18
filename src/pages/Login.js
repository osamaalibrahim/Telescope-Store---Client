import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { Container } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const api = "http://localhost:3001";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await userLogin({ email, password });
  };

  const userLogin = async ({ email, password }) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      login(accessToken);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error("Invalid username or password!");
      setPassword("");
    }
  };

  return (
    <Container mt={[5, 5, 6, 8]}>
      <LoginCard
        register={false}
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Container>
  );
}

export default Login;
