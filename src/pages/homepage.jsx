import React, { useState } from "react";
import Catalogue from "../components/catalogue";
import Map from "../components/map";
import NavBar from "../components/navBar";

const HomePage = () => {
  const [hide, setHide] = useState(false);
  const [radius, setRadius] = useState(0);
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar hide={hide} setHide={setHide} />
      <Map hide={hide} radius={radius} />
      <Catalogue radius={radius} setRadius={setRadius} />
    </div>
  );
};

export default HomePage;
