import React from "react";
import Hero from "../components/Hero";
import Animation from "../components/Animation";

function Home() {
  return (
    <>
      <Animation component={<Hero />} />
    </>
  );
}

export default Home;
