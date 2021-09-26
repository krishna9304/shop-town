const ShopCard = ({ shopInfo }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <div className="flex gap-4 overflow-x-auto bg-black">
        <img
          className="w-full"
          src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
          alt="Sunset in the mountains"
        />
        <img
          className="w-full"
          src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
          alt="Sunset in the mountains"
        />
        <img
          className="w-full"
          src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{shopInfo.shopName}</div>
        <div className="flex flex-col">
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
        {Object.keys(shopInfo.availableProducts)
          .slice(0, 3)
          .map((key) => {
            return (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-500 mr-2 mb-2">
                #{shopInfo.availableProducts[key]}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default ShopCard;
