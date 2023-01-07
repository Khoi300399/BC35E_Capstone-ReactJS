import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import "./assets/scss/style.scss";
import HomeTemplate from "./template/homeTemplate/HomeTemplate";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Profile from "./pages/profile/Profile";
import Carts from "./pages/carts/Carts";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import MenuProfile from "./components/menuProfile/MenuProfile.jsx";
import MenuOrderHistory from "./components/menuOrderHistory/MenuOrderHistory.jsx";
import MenuFavourite from "./components/menuFavourite/MenuFavourite.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteApi,
  setProductFavorite,
} from "./redux/reducers/productReducer";
import { loginAction } from "./redux/reducers/userReducer";
import { isExpired } from "react-jwt";
import { TOKEN, USER_LOGIN, huyStore, layStore } from "./util/config";

const App = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const isMyTokenExpired = isExpired(JSON.parse(layStore(TOKEN)));
  useEffect(() => {
    if (isMyTokenExpired) {
      huyStore(TOKEN);
      huyStore(USER_LOGIN);
      dispatch(loginAction(null));
    }
  }, [isMyTokenExpired, dispatch]);

  useEffect(() => {
    if (userLogin && !isMyTokenExpired) {
      dispatch(getFavoriteApi());
      return;
    }

    dispatch(setProductFavorite([]));
  }, [userLogin, dispatch, isMyTokenExpired]);

  return (
    <Routes>
      <Route path="" element={<HomeTemplate />}>
        <Route index element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="detail">
          <Route path=":id" element={<Detail />}>
            {" "}
          </Route>
        </Route>
        <Route path="" element={<Profile />}>
          <Route path="profile" element={<MenuProfile />}></Route>
          <Route path="order" element={<MenuOrderHistory />}></Route>
          <Route path="favourite" element={<MenuFavourite />}></Route>
        </Route>
        <Route path="carts" element={<Carts />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="search" element={<Search />}></Route>
        <Route path="*" element={<Navigate to="" />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
