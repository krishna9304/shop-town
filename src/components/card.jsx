import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShopCard = ({ shopInfo }) => {
  const uid = shopInfo.uid;
  const user = useSelector((state) => state.user);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <div className="flex gap-1 overflow-x-auto bg-black">
        {shopInfo.photos ? (
          Object.values(shopInfo.photos).map((photo, idx) => {
            return (
              <img className="w-full h-full" key={idx} src={photo} alt="shop" />
            );
          })
        ) : (
          <h1 className="text-white w-full h-full flex justify-center items-center">
            No photos
          </h1>
        )}
      </div>
      <div className="px-6 py-2">
        <div className="font-bold text-xl cursor-pointer">
          <Link className="text-black hover:underline" to={`/shops/${uid}`}>
            {shopInfo.shopName}
          </Link>
        </div>
        {user && shopInfo.uid === user.uid ? (
          <span className="text-xs px-1 py-0.5 bg-yellow-600 text-white rounded-full">
            {shopInfo.uid === user.uid ? "Your shop" : ""}
          </span>
        ) : null}
        <div className="flex flex-col mt-2">
          <div className="w-full flex">
            <div className="w-1/2 font-bold text-xs">Category: </div>
            <div className="w-1/2 text-xs">{shopInfo.shopCategory}</div>
          </div>
          <div className="w-full flex ">
            <div className="w-1/2 font-bold text-xs">Opening Hours: </div>
            <div className="w-1/2 text-green-600 text-xs font-bold ">
              {shopInfo.openingHours[0].slice(
                11,
                shopInfo.openingHours[0].length - 9
              )}
              &nbsp;-&nbsp;
              {shopInfo.openingHours[1].slice(
                11,
                shopInfo.openingHours[1].length - 9
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-2">
        {shopInfo.availableProducts? Object.keys(shopInfo.availableProducts)
          .slice(0, 3)
          .map((key) => {
            return (
              <span
                key={key}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-500 mr-2 mb-2"
              >
                #{shopInfo.availableProducts[key]}
              </span>
            );
          }):null}
      </div>
    </div>
  );
};

export default ShopCard;
