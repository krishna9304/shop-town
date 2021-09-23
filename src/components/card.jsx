const ShopCard = () => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <div className="text-sm font-light">Address :</div>
            <div className="text-sm font-light">Email : </div>
            <div className="text-sm font-light">Contact No :</div>
            <div className="text-sm font-light">Website : </div>
            <div className="text-sm font-light">Opening Hours : </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="text-sm font-light">Jamshedpur</div>
            <a
              href="mailto:something@gmail.com"
              className="text-sm hover:underline text-blue-700"
            >
              something@gmail.com
            </a>
            <div className="text-sm font-light">9876543210</div>
            <a
              href="https://shop.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:underline text-blue-700"
            >
              shop.com
            </a>
            <div className="text-sm font-light">
              <span className="text-green-600 text-xs font-bold">9:00AM</span>
              &nbsp;-
              <span className="text-green-600 text-xs font-bold">
                &nbsp;10:30PM
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default ShopCard;
