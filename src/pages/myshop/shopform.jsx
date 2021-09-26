import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  Checkbox,
  Upload,
  Modal,
  notification,
  Spin,
} from "antd";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDatabase, ref, set } from "@firebase/database";
import { useSelector } from "react-redux";
import moment from "moment";
import Text from "antd/lib/typography/Text";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ShopForm = () => {
  const { shop, user } = useSelector((state) => state);
  const uid = user.uid;
  const [center, setCenter] = useState([0, 0]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [shopFormData, setShopFormData] = useState({
    shopName: "",
    shopCategory: "",
    openingHours: ["", ""],
    shopAddress: "",
    websiteURL: "",
    workEmail: "",
    phoneNo: "",
    pictures: null,
    locationCoords: [center[0], center[1]],
    isAgreed: false,
    availableProducts: [],
  });
  const [file0, setFile0] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    width: "100%",
    height: "100%",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (shop) {
      setShopFormData(shop);
      setProducts(Object.values(shop.availableProducts));
    }
    return () => {};
  }, [shop]);

  useEffect(() => {
    setViewport((v) => ({ ...v, latitude: center[1], longitude: center[0] }));
  }, [center]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCancel = () => setFile0((f) => ({ ...f, previewVisible: false }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setFile0((f) => ({
      ...f,
      previewImage: f.url || f.preview,
      previewVisible: true,
      previewTitle: f.name || f.url.substring(f.url.lastIndexOf("/") + 1),
    }));
  };

  const handleChange = ({ fileList }) => setFile0((f) => ({ ...f, fileList }));

  function newShop() {
    const db = getDatabase();
    set(ref(db, "shops/" + uid), shopFormData).then(() => {
      notification.success({
        message: "Success",
        description: shop ? "Shop Updated!" : "Shop Created!",
      });
    });
  }
  if (!shop)
    return (
      <div className="w-screen flex justify-center items-center">
        <h1 className="text-3xl font-light text-blue-500">
          Loading... <Spin />
        </h1>
      </div>
    );
  return (
    <div className="min-h-screen w-screen">
      <div className="w-full flex justify-center items-center p-10 pb-0">
        <div className="w-full md:w-1/2 font-bold text-4xl text-gray-800">
          {shop ? "Update" : "Create"} your shop 🛒
        </div>
      </div>
      <div className="w-full flex justify-center items-center p-10">
        <Form
          layout="vertical"
          fields={Object.keys(shopFormData).map((key) => {
            if (key === "openingHours") {
              let oh = new Date(shopFormData[key]);
              return {
                name: key,
                value: moment(
                  `${oh.getHours()}:${oh.getMinutes()}:${oh.getSeconds()}`,
                  "HH:mm:ss"
                ),
              };
            }
            return {
              name: key,
              value: shopFormData[key],
            };
          })}
          size={"default"}
          className="w-full md:w-1/2"
        >
          <Form.Item
            name="shopName"
            rules={[
              {
                required: true,
              },
            ]}
            className="flex flex-col gap-10"
            label="Your shop name"
          >
            <Input
              onChange={(e) => {
                setShopFormData((s) => ({ ...s, shopName: e.target.value }));
              }}
              placeholder="Shop name"
            />
          </Form.Item>
          <Form.Item
            name="shopCategory"
            rules={[
              {
                required: true,
              },
            ]}
            className="flex flex-col gap-10"
            label="Select your shop category"
          >
            <Select
              onChange={(e) => {
                setShopFormData((s) => ({ ...s, shopCategory: e }));
              }}
              value={shopFormData.shopCategory}
              placeholder="Shop Category"
            >
              <Select.Option value="Groceries">Groceries</Select.Option>
              <Select.Option value="General Store">General Store</Select.Option>
              <Select.Option value="Clothing Store">
                Clothing Store
              </Select.Option>
              <Select.Option value="Toy Shop">Toy Shop</Select.Option>
              <Select.Option value="Crockery Store">
                Crockery Store
              </Select.Option>
              <Select.Option value="Stationary Shop">
                Stationary Shop
              </Select.Option>
              <Select.Option value="Pharmacy">Pharmacy</Select.Option>
              <Select.Option value="Salon">Salon</Select.Option>
              <Select.Option value="Beauty Products">
                Beauty Products
              </Select.Option>
              <Select.Option value="Electronics Shop">
                Electronics Shop
              </Select.Option>
              <Select.Option value="Restaurant">Restaurant</Select.Option>
              <Select.Option value="Other">Other..</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="openingHours"
            rules={[
              {
                required: true,
              },
            ]}
            label="Opening hours"
          >
            <TimePicker.RangePicker
              onChange={(e) => {
                setShopFormData((s) => ({
                  ...s,
                  openingHours: [e[0].format(), e[1].format()],
                }));
              }}
            />
            <div className="">
              {shop ? (
                <Text
                  style={{
                    color: "green",
                  }}
                  className="text-xs"
                >
                  Your opening hours are currently between&nbsp;
                  {shopFormData.openingHours[0].slice(
                    11,
                    shopFormData.openingHours[0].length - 9
                  )}
                  -
                  {shopFormData.openingHours[1].slice(
                    11,
                    shopFormData.openingHours[1].length - 9
                  )}
                  . <span className="font-bold">Change to update.</span>
                </Text>
              ) : null}
            </div>
          </Form.Item>
          <Form.Item
            name="shopAddress"
            rules={[{ required: true }]}
            label="Enter your shop's address"
          >
            <Input.TextArea
              onChange={(e) => {
                setShopFormData((s) => ({
                  ...s,
                  shopAddress: e.target.value,
                }));
              }}
              placeholder="Address goes here"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="What are the items that you sell?">
            <div className="flex gap-4">
              <Input
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
                placeholder="Featured products"
                value={product}
              />
              <Button
                onClick={() => {
                  setShopFormData((s) => ({
                    ...s,
                    availableProducts: [...products, product],
                  }));
                  setProducts((p) => {
                    return [...p, product];
                  });
                  setProduct("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              {(() => {
                if (shopFormData.availableProducts) {
                  return products.map((prod) => {
                    return (
                      <div className="px-2 py-1 border border-blue-600 text-blue-600">
                        {prod}
                      </div>
                    );
                  });
                }
              })()}
            </div>
          </Form.Item>
          <Form.Item
            name="websiteURL"
            label="URL"
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input
              onChange={(e) => {
                setShopFormData((s) => ({
                  ...s,
                  websiteURL: e.target.value,
                }));
              }}
              value={shopFormData.websiteURL}
              placeholder="Input your website url"
            />
          </Form.Item>
          <Form.Item
            name="workEmail"
            label="Work email"
            rules={[{ type: "email", required: true }]}
          >
            <Input
              onChange={(e) => {
                setShopFormData((s) => ({
                  ...s,
                  workEmail: e.target.value,
                }));
              }}
              value={shopFormData.workEmail}
              placeholder="Enter work email"
            />
          </Form.Item>
          <Form.Item
            name="phoneNo"
            label="Phone Number"
            rules={[{ required: true }, { type: "string", len: 10 }]}
          >
            <Input
              onChange={(e) => {
                setShopFormData((s) => ({
                  ...s,
                  phoneNo: e.target.value,
                }));
              }}
              placeholder="Enter phone number"
              value={shopFormData.phoneNo}
            />
          </Form.Item>
          <Form.Item label="Upload amazing pictures of your shop">
            <Upload
              action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
              listType="picture-card"
              fileList={file0.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {file0.fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={file0.previewVisible}
              title={file0.previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{ width: "100%" }}
                src={file0.previewImage}
              />
            </Modal>
          </Form.Item>
          <Form.Item required label="Locate your shop 📍">
            <div
              className={`w-full h-96 border-2 border-black ${
                shop ? "mb-2" : ""
              }`}
            >
              <ReactMapGL
                onClick={(e) => {
                  setCenter([e.lngLat[0], e.lngLat[1]]);
                  setShopFormData((s) => ({
                    ...s,
                    locationCoords: [e.lngLat[0], e.lngLat[1]],
                  }));
                }}
                mapStyle={"mapbox://styles/mapbox/streets-v11"}
                mapboxApiAccessToken={
                  "pk.eyJ1IjoicmliaTI5IiwiYSI6ImNrdGZtejF3ZjAyMzYyb3FzcGdlcHdyMmgifQ.mk68YIafe7p9eu-hVFJVpQ"
                }
                {...viewport}
                onViewportChange={(nextView) => setViewport(nextView)}
              >
                <Marker
                  latitude={
                    shopFormData ? shopFormData.locationCoords[1] : center[1]
                  }
                  longitude={
                    shopFormData ? shopFormData.locationCoords[0] : center[0]
                  }
                >
                  <div
                    className="text-2xl"
                    style={{
                      marginTop: -(viewport.zoom ** 2.9 / 100) / 2,
                      marginLeft: -(viewport.zoom ** 2.9 / 100) / 2,
                    }}
                  >
                    📍
                  </div>
                </Marker>
              </ReactMapGL>
            </div>
            {!shop ? (
              <div className="pb-2">
                <Text
                  style={{
                    color: "red",
                  }}
                  className="text-xs"
                >
                  * The map displays your current location by default, kindly
                  click on the map to choose your shop's location. *
                </Text>
              </div>
            ) : null}
            <Form.Item label="Latitude">
              <Input
                value={shopFormData.locationCoords[1]}
                placeholder="latitude"
              />
            </Form.Item>
            <Form.Item label="Longitude">
              <Input
                value={shopFormData.locationCoords[0]}
                placeholder="longitude"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            required
            name="Agreement"
            label="~ Agree to the terms and conditions"
          >
            <Checkbox
              checked={shopFormData.isAgreed}
              onChange={(e) => {
                setShopFormData((s) => ({ ...s, isAgreed: e.target.checked }));
              }}
            >
              These details will be public and will be shown in this website.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                if (
                  shopFormData.locationCoords[0] !== 0 &&
                  shopFormData.locationCoords[1] !== 0 &&
                  shopFormData.openingHours[0] !== "" &&
                  shopFormData.openingHours[1] !== "" &&
                  shopFormData.phoneNo.length === 10 &&
                  shopFormData.shopAddress !== "" &&
                  shopFormData.shopCategory !== "" &&
                  shopFormData.shopName !== "" &&
                  shopFormData.websiteURL !== "" &&
                  shopFormData.workEmail !== ""
                ) {
                  newShop();
                } else {
                  notification.warning({
                    message: "WARNING!!",
                    description: "Please fill all the details correctly!",
                  });
                }
                if (!shopFormData.isAgreed) {
                  notification.warning({
                    message: "WARNING!!",
                    description: "PLease agree to the terms and conditions.",
                  });
                }
              }}
              className="mr-4"
              htmlType="submit"
              type="default"
            >
              Preview
            </Button>
            <Button htmlType="reset" type="primary">
              Clear
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShopForm;
