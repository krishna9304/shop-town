import React, { useState } from "react";
import Catalogue from "../components/catalogue";
import Map from "../components/map";
import NavBar from "../components/navBar";

const HomePage = () => {
  const [radius, setRadius] = useState(0);
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      <Map radius={radius} />
      <Catalogue radius={radius} setRadius={setRadius} />
    </div>
  );
};

export default HomePage;
