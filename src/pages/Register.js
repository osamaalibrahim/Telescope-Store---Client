import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { Container } from "@chakra-ui/react";

function Register() {
  const api = "http://localhost:3001";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await userRegister({ name, email, password });
  };

  const userRegister = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${api}/auth/register`, {
        name,
        email,
        password,
      });
      toast.success("Account Created successfully!. Please login to continue.");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      toast.error("Email already exists! Please try with another email.");
      setPassword("");
    }
  };

  return (
    <Container mt={[5, 5, 6, 8]}>
      <LoginCard
        register={true}
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Container>
  );
}
export default Register;
