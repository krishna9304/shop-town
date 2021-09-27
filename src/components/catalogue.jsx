import { useEffect, useState } from "react";
import ShopCard from "./card";
import "./catalogue.css";
import { getDatabase, onValue, ref } from "@firebase/database";
import { Empty, Spin } from "antd";
import { getShops } from "../utilities/getShops";
import { useSelector } from "react-redux";

const Catalogue = ({ finalShops, setFinalShops }) => {
  const [scroll, setScroll] = useState(0);
  const [shops, setShops] = useState(null);
  const { userCurrLoc } = useSelector((state) => state);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    window.onscroll = (e) => {
      setScroll(window.scrollY);
    };
    return () => {};
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const shopsRef = ref(db, "shops/");
    onValue(shopsRef, (snapshot) => {
      setShops(snapshot.toJSON());
    });
  }, []);

  useEffect(() => {
    if (shops && userCurrLoc) {
      setFinalShops(getShops(shops, userCurrLoc));
    }
    // eslint-disable-next-line
  }, [shops, userCurrLoc]);

  if (!finalShops)
    return (
      <div className="w-screen p-10 flex justify-center items-center">
        <h1 className="md:text-3xl text-2xl font-light text-center">
          Loading businesses near you <Spin />
        </h1>
      </div>
    );
  return (
    <div className="w-screen h-full flex justify-center">
      <div className="md:flex-1 md:flex bg-gray-400 hidden"></div>
      <div className="flex flex-col p-4 md:w-3/4 w-full">
        <div
          style={{
            zIndex: 10,
          }}
          className={`w-full gap-2 md:gap-4 flex justify-center items-center md:flex-row flex-col ${
            scroll > 450
              ? "fixed top-0 right-0 md:w-3/4 bg-white rounded-lg px-4 py-2 shadow-lg"
              : ""
          }`}
        >
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="w-full md:w-1/2 bg-gray-200 p-2 outline-none rounded-lg text-gray-700 font-light text-sm"
            type="text"
            placeholder="Search for shops"
          />
        </div>
        <div
          className={`w-full p-6 flex flex-wrap gap-8 justify-center md:justify-start ${
            scroll > 450 ? "mt-24 md:mt-20" : ""
          }`}
        >
          {finalShops ? (
            finalShops.map((shop, idx) => {
              return <ShopCard key={idx} shopInfo={shop} />;
            })
          ) : (
            <Empty description="No shops around you!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
