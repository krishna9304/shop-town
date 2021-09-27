import React, { useState } from "react";
import Catalogue from "../components/catalogue";
import Map from "../components/map";
import NavBar from "../components/navBar";

const HomePage = () => {
  const [hide, setHide] = useState(false);
  const [finalShops, setFinalShops] = useState(null);

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar hide={hide} setHide={setHide} />
      <Map shops={finalShops} hide={hide} />
      <Catalogue finalShops={finalShops} setFinalShops={setFinalShops} />
    </div>
  );
};

export default HomePage;
