import { Empty, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";

const MyShop = () => {
  const { shop } = useSelector((state) => state);
  return (
    <div
      className={`w-screen flex justify-center items-center ${
        shop ? "" : "py-10"
      }`}
    >
      {!shop ? (
        <Empty
          className="flex justify-center items-center flex-col"
          description={
            <span className="text-gray-500">
              You haven't created your shop yet :(
            </span>
          }
        ></Empty>
      ) : (
        <div className="w-screen md:shadow-lg">
          <div className="w-full h-96 bg-black flex overflow-x-auto gap-4">
            <img
              className="w-full h-full bg-cover"
              src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
              alt="shop"
            />
            <img
              className="w-full h-full bg-cover"
              src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
              alt="shop"
            />
            <img
              className="w-full h-full bg-cover"
              src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
              alt="shop"
            />
            <img
              className="w-full h-full bg-cover"
              src="https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg"
              alt="shop"
            />
          </div>
          <div className="w-full px-4 py-2 flex text-3xl font-light shadow-lg text-center justify-center items-center">
            ⚈ &nbsp;{shop.shopName}&nbsp; ⚈
          </div>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Overview" key="1">
              <div className="w-screen flex justify-center items-center">
                <div className="flex flex-col w-full md:w-1/2 border p-4">
                  <div className="w-full flex bg-gray-100 p-2">
                    <div className="w-1/2">Category: </div>
                    <div className="w-1/2">{shop.shopCategory}</div>
                  </div>
                  <div className="w-full flex bg-gray-50 p-2">
                    <div className="w-1/2">Shop Address: </div>
                    <div className="w-1/2">{shop.shopAddress}</div>
                  </div>
                  <div className="w-full flex bg-gray-100 p-2">
                    <div className="w-1/2">Opening Hours: </div>
                    <div className="w-1/2 text-green-600 font-bold ">
                      {shop.openingHours[0].slice(
                        11,
                        shop.openingHours[0].length - 9
                      )}
                      &nbsp;-&nbsp;
                      {shop.openingHours[1].slice(
                        11,
                        shop.openingHours[1].length - 9
                      )}
                    </div>
                  </div>
                  <div className="w-full flex bg-gray-50 p-2">
                    <div className="w-1/2">Work Email: </div>
                    <a
                      href={`mailto:${shop.workEmail}`}
                      className="w-1/2 whitespace-pre-wrap break-words"
                    >
                      {shop.workEmail}
                    </a>
                  </div>
                  <div className="w-full flex bg-gray-100 p-2">
                    <div className="w-1/2">Phone Number: </div>
                    <div className="w-1/2">{shop.phoneNo}</div>
                  </div>
                  <div className="w-full flex bg-gray-50 p-2">
                    <div className="w-1/2">Website: </div>
                    <a
                      href={shop.websiteURL}
                      className="w-1/2 whitespace-pre-wrap break-words"
                    >
                      {shop.websiteURL}
                    </a>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Reviews" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Available Products" key="3">
              <div className="w-screen flex justify-center items-center">
                <div className="flex flex-wrap gap-4 justify-center items-center w-full md:w-1/2 border p-4">
                  <Text className="w-full border px-2 py-1 bg-gray-100 text-center">
                    These are some featured products available here
                  </Text>
                  {Object.keys(shop.availableProducts).map((key) => {
                    return (
                      <div
                        key={key}
                        className="px-2 py-1 border border-purple-600 text-purple-600"
                      >
                        {shop.availableProducts[key]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MyShop;
