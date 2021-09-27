import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage";
import MyShopMain from "./pages/myshop";
import {
  setAuth,
  setLocation,
  setReviews,
  setShop,
  setUser,
} from "./redux/actions/actions";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getDatabase, onValue, ref } from "@firebase/database";
import ShopProfile from "./pages/shopProfile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(setLocation([pos.coords.longitude, pos.coords.latitude]));
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setAuth(true));
        const db = getDatabase();
        const shopRef = ref(db, "shops/" + user.uid);
        onValue(shopRef, (snapshot) => {
          if (snapshot.exists()) {
            dispatch(setShop(snapshot.toJSON()));
          } else {
            console.log("shop not found");
          }
        });
        const reviewRef = ref(db, "reviews/" + user.uid);
        onValue(reviewRef, (snapshot) => {
          if (snapshot.exists()) {
            dispatch(setReviews(Object.values(snapshot.toJSON())));
          }
        });
      } else {
        dispatch(setUser(null));
        dispatch(setAuth(false));
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <HomePage />;
            }}
          />
          <Route
            path="/shop/myShop"
            render={() => {
              if (user) return <MyShopMain />;
              return <HomePage />;
            }}
          />
          <Route
            path="/shop/edit-your-shop"
            render={() => {
              if (user) return <MyShopMain />;
              return <HomePage />;
            }}
          />
          <Route
            path="/shops/:uid"
            render={() => {
              return <ShopProfile />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
