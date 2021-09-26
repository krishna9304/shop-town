import { useEffect, useState } from "react";
import ShopCard from "./card";
import "./catalogue.css";
import { getDatabase, onValue, ref } from "@firebase/database";
import { Empty, Spin } from "antd";
import Text from "antd/lib/typography/Text";

const Catalogue = ({ radius, setRadius }) => {
  const [scroll, setScroll] = useState(0);
  const [shops, setShops] = useState(null);
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
  if (!shops)
    return (
      <div className="w-screen p-10 flex justify-center items-center">
        <h1 className="text-3xl font-light text-blue-500">
          Loading shops... <Spin />
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
            className="w-full md:w-1/2 bg-gray-200 p-2 outline-none rounded-lg text-gray-700 font-light text-sm"
            type="text"
            placeholder="Search for shops"
          />
          <div className="flex flex-col w-full md:w-1/6 border p-2 gap-2">
            <Text className="text-xs">*Select range (in meters)</Text>
            <input
              onChange={(e) => {
                setRadius(e.target.value);
              }}
              className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
              type="range"
              min="1"
              max="2"
              step="0.001"
              value={radius}
            />
          </div>
        </div>
        <div
          className={`w-full p-6 flex flex-wrap gap-8 justify-center md:justify-start ${
            scroll > 450 ? "mt-24 md:mt-20" : ""
          }`}
        >
          {shops ? (
            Object.keys(shops).map((key) => {
              return <ShopCard shopInfo={shops[key]} />;
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
