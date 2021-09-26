import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage";
import MyShopMain from "./pages/myshop";
import { setAuth, setShop, setUser } from "./redux/actions/actions";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getDatabase, onValue, ref } from "@firebase/database";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
      } else {
        dispatch(setUser(null));
        dispatch(setAuth(false));
      }
    });

    // eslint-disable-next-line
  }, []);
  if (!user)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-3xl font-light text-blue-500">
          Loading... <Spin />
        </h1>
      </div>
    );
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
