import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  huyStore,
  eraseCookie,
  USER_LOGIN,
  TOKEN,
} from "../../util/config.jsx";

const Header = () => {
  const { total } = useSelector((state) => state.cartReducer);

  const { userLogin } = useSelector((state) => state.userReducer);

  const renderLogin = () => {
    if (userLogin) {
      return (
        <NavLink className={"nav-link"} to="/profile">
          Hello ! {userLogin.email}
        </NavLink>
      );
    }
    return (
      <NavLink className={"nav-link"} to="/login">
        Login
      </NavLink>
    );
  };

  const renderGioHang = () => {
    if (userLogin) {
      return (
        <NavLink
          className="nav-link-cart nav-flex nav-semi"
          to="/carts"
          aria-current="page"
        >
          <img src="../img/cart.png" alt="..." />({total})
        </NavLink>
      );
    }

    return (
      <NavLink className={"nav-link-cart nav-flex nav-semi"} to="/login">
        <img src="../img/cart.png" alt="..." />({total})
      </NavLink>
    );
  };

  const navigate = useNavigate();
  const logOut = () => {
    if (userLogin) {
      return (
        <button
          className="nav-logout"
          onClick={() => {
            huyStore(USER_LOGIN);
            eraseCookie(TOKEN);
            navigate("/home");
            window.location.reload();
          }}
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
        </button>
      );
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md">
        <NavLink className="navbar-brand d-flex align-items-center" to="">
          <img src="../img/image 3.png" alt="..." />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <i className="fa-solid fa-bars" />
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link-cart nav-flex nav-big"
                to="/search"
                aria-current="page"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                Search
              </NavLink>
            </li>
            <li className="nav-item">{renderGioHang()}</li>

            <li className="nav-item">{renderLogin()}</li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register" aria-current="page">
                Register
              </NavLink>
            </li>
            <li className="nav-item">{logOut()}</li>
          </ul>
        </div>
      </nav>
      <nav className="nav">
        <NavLink
          className="nav-link-2 is-active"
          to="/home"
          aria-current="page"
        >
          Home
        </NavLink>
        <NavLink className="nav-link-2" to="">
          Men
        </NavLink>
        <NavLink className="nav-link-2" to="">
          Women
        </NavLink>
        <NavLink className="nav-link-2" to="">
          Kid
        </NavLink>
        <NavLink className="nav-link-2" to="">
          Sport
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
