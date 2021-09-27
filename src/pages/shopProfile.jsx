import { Button, Empty, Input, notification, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { getDatabase, onValue, ref, set, push } from "@firebase/database";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/reviewCard";
import { useSelector } from "react-redux";

const ShopProfile = () => {
  const [shop, setShop] = useState(null);
  const { user } = useSelector((state) => state);
  const [allReviews, setAllReviews] = useState([]);
  const [review, setReview] = useState({
    text: "",
    reviewedBy: "",
    photo: "",
  });
  const { uid } = useParams();
  useEffect(() => {
    const db = getDatabase();
    const shopRef = ref(db, "shops/" + uid);
    onValue(shopRef, (snapshot) => {
      if (snapshot.exists()) {
        setShop(snapshot.toJSON());
      } else {
        console.log("shop not found");
      }
    });
    const reviewRef = ref(db, "reviews/" + uid);
    onValue(reviewRef, (snapshot) => {
      if (snapshot.exists()) {
        setAllReviews(Object.values(snapshot.toJSON()));
      }
    });
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setReview({ ...review, reviewedBy: user.email, photo: user.photoURL });
    }
    return () => {};
    // eslint-disable-next-line
  }, [user]);

  function addReview() {
    const db = getDatabase();
    const reviewRef = ref(db, "reviews/" + uid);
    const newReviewRef = push(reviewRef);
    set(newReviewRef, review)
      .then(() => {
        notification.success({
          message: "Success",
          description: "Review submitted succesfully",
        });
      })
      .catch(console.error);
  }
  return (
    <>
      <NavBar />
      <div
        className={`w-screen flex justify-center items-center ${
          shop ? "" : "py-10"
        }`}
      >
        {!shop ? (
          <Empty
            className="flex justify-center items-center flex-col"
            description={
              <span className="text-gray-500">No business found :(</span>
            }
          ></Empty>
        ) : (
          <div className="w-screen">
            <div className="w-full h-96 bg-black flex overflow-x-auto gap-4">
              {shop.photos ? (
                Object.values(shop.photos).map((photo, idx) => {
                  return (
                    <img
                      className="w-full h-full"
                      key={idx}
                      src={photo}
                      alt="shop"
                    />
                  );
                })
              ) : (
                <h1 className="text-white w-full h-full flex justify-center items-center">
                  No photos
                </h1>
              )}
            </div>
            <div className="w-full px-4 py-2 flex text-3xl font-light shadow-lg text-center justify-center items-center">
              ⚈ &nbsp;{shop.shopName}&nbsp; ⚈
            </div>
            <Tabs defaultActiveKey="1" centered>
              <Tabs.TabPane tab="Overview" key="1">
                <div className="w-screen flex justify-center items-center flex-col gap-8 pb-10">
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
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reviews" key="2">
                <div className="w-screen flex flex-col justify-center items-center gap-4">
                  {user ? (
                    <div className="flex flex-col items-end gap-4 w-full md:w-1/2 border p-4">
                      <Input.TextArea
                        onChange={(e) => {
                          setReview((r) => ({ ...r, text: e.target.value }));
                        }}
                        placeholder="Write a review..."
                        value={review.text}
                      ></Input.TextArea>
                      <Button
                        onClick={() => {
                          if (
                            review.photo !== "" &&
                            review.reviewedBy !== "" &&
                            review.text !== ""
                          ) {
                            addReview();
                            setReview({
                              ...review,
                              text: "",
                            });
                          } else {
                            notification.warning({
                              message: "Warning!",
                              description: "Please fill all the fields!",
                            });
                          }
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-4 justify-center items-center w-full md:w-1/2 border p-4">
                    {allReviews.map((rev, idx) => {
                      return <ReviewCard key={idx} review={rev} />;
                    })}
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopProfile;
