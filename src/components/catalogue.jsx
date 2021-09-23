import { useEffect, useState } from "react";
import ShopCard from "./card";
import "./catalogue.css";
const Catalogue = ({ radius, setRadius }) => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.onscroll = (e) => {
      setScroll(window.scrollY);
    };
    return () => {};
  }, []);
  return (
    <div className="w-screen flex justify-center">
      <div className="md:flex-1 md:flex bg-gray-400 hidden"></div>
      <div className="flex flex-col p-4 md:w-3/4 w-full">
        <div
          style={{
            zIndex: 10,
          }}
          className={`w-full gap-4 flex justify-center items-center md:flex-row flex-col ${
            scroll > 450
              ? "fixed top-0 right-0 md:w-3/4 bg-white rounded-lg p-4 shadow-lg"
              : ""
          }`}
        >
          <input
            className="w-full md:w-1/2 bg-gray-200 p-4 outline-none rounded-lg text-gray-700 font-light text-sm"
            type="text"
            placeholder="Search for shops"
          />
          <input
            onChange={(e) => {
              setRadius(e.target.value);
            }}
            className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full md:w-1/6"
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={radius}
          />
        </div>
        <div
          className={`w-full p-6 flex flex-wrap gap-8 justify-center ${
            scroll > 450 ? "mt-24 md:mt-20" : ""
          }`}
        >
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
