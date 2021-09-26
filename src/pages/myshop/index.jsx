import React from "react";
import { useSelector } from "react-redux";
import ShopForm from "./shopform";
import MyShop from "./myshop";
import { Tabs } from "antd";
import Navbar from "../../components/navBar";
import { useLocation, useHistory } from "react-router-dom";

const MyShopMain = () => {
  let location = useLocation().pathname;
  const history = useHistory();
  location = location.slice(6, location.length);
  const { user, shop } = useSelector((state) => state);

  return (
    <>
      <Navbar
        mapControl={
          location === "myShop" || location === "edit-your-shop" ? false : true
        }
      />
      <div className="py-4">
        {user ? (
          <Tabs
            onChange={(key) => {
              if (key === "1") history.push("/shop/myShop");
              else if (key === "2") history.push("/shop/edit-your-shop");
            }}
            defaultActiveKey={() => {
              if (location === "myShop") {
                return "1";
              } else if (location === "edit-your-shop") {
                return "2";
              }
            }}
            type="card"
          >
            <Tabs.TabPane tab="My Shop" key="1">
              <MyShop />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={shop ? "Update your shop" : "Create your shop"}
              key="2"
            >
              <ShopForm />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          "loading.."
        )}
      </div>
    </>
  );
};

export default MyShopMain;
