import { useEffect, useState } from "react";
import ShopCard from "./card";
import "./catalogue.css";
import { getDatabase, onValue, ref } from "@firebase/database";
import { Empty } from "antd";
import { getShops } from "../utilities/getShops";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Catalogue = ({ finalShops, setFinalShops }) => {
  const [scroll, setScroll] = useState(0);
  const [shops, setShops] = useState(null);
  const { userCurrLoc } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    window.onscroll = (e) => {
      setScroll(window.scrollY);
    };
    return () => {};
  }, []);
  const includeTags = (tags, val) => {
    let includes = false;
    tags.forEach((tag) => {
      if (tag.toLowerCase().includes(val)) {
        includes = true;
      }
    });
    return includes;
  };

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
  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="flex flex-col w-full">
        <div
          style={{
            zIndex: 10,
          }}
          className={`w-full flex shadow-lg py-2 justify-center items-center ${
            scroll > 450
              ? "fixed top-0 right-0 bg-white rounded-lg px-4 py-2"
              : ""
          }`}
        >
          <div className="relative w-full">
            <div className="flex gap-2 w-full p-2 cursor-pointer select-none justify-center">
              <input
                onChange={(e) => {
                  if (e.target.value.trim().length) {
                    let i = 0;
                    Object.keys(shops).forEach((key) => {
                      let tags = shops[key].availableProducts
                        ? Object.values(shops[key].availableProducts)
                        : [];
                      if (
                        shops[key].shopName
                          .toLowerCase()
                          .includes(e.target.value.trim().toLowerCase()) ||
                        includeTags(tags, e.target.value.trim())
                      ) {
                        if (!i) {
                          setSearchResults([{ shop: shops[key], uid: key }]);
                        } else {
                          setSearchResults((s) => [
                            ...s,
                            { shop: shops[key], uid: key },
                          ]);
                        }
                        i++;
                      }
                    });
                  } else {
                    setSearchResults([]);
                  }
                }}
                className="w-full md:w-1/2 bg-gray-200 p-4 outline-none rounded-lg text-gray-700 font-light text-sm"
                type="text"
                placeholder="Search for shops"
              />
            </div>
            <div
              style={{
                zIndex: 100,
              }}
              className={`origin-top-right absolute justify-center items-center right-0 w-full ring-black ring-opacity-5 focus:outline-none ${
                searchResults.length ? "flex" : "hidden"
              }`}
              role="menu"
            >
              <div className="w-full md:w-1/2 rounded-md shadow-lg bg-white ring-1 gap-4">
                {searchResults.map((shop, key) => {
                  return (
                    <div
                      className="hover:bg-gray-100 p-2 w-full cursor-pointer"
                      key={key}
                    >
                      <Link to={`/shops/${shop.uid}`}>
                        {shop.shop.shopName}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full p-6 flex flex-wrap gap-8 justify-center md:justify-start ${
            scroll > 455 ? " mt-20" : ""
          }`}
        >
          {finalShops ? (
            finalShops.map((shop, idx) => {
              return <ShopCard key={idx} shopInfo={shop} />;
            })
          ) : (
            <div className="w-full h-full justify-center items-center">
              <Empty description="No shops around you!" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
