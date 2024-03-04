import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import Animation from "../components/Animation";
import axios from "axios";
import toast from "react-hot-toast";

function Support() {
  const api = "http://localhost:3001";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage({ name, email, text });
  };

  const sendMessage = async ({ name, email, text }) => {
    axios
      .post(`${api}/message`, {
        name,
        email,
        text,
      })
      .then((response) => {
        toast.success("Message sent successfully! Please check your email.");
        setName("");
        setEmail("");
        setText("");
      })
      .catch((error) => {
        toast.error(
          "There was an error sending your message. Please try again."
        );
        setName("");
        setEmail("");
        setText("");
      });
  };

  return (
    <Animation
      component={
        <ContactForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

export default Support;
