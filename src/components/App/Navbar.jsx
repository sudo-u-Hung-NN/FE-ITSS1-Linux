import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DropDownNavbar from "../OtherComponent/IsLogined/DropDownNavbar";
import { clearRedux } from "../../Redux/auth.slice";
import Profile from "../Profile/Profile";
import { GrClose } from "react-icons/gr";
import { getUser } from "../Api/user.api";

function Navbar(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dataUser = useSelector((state) => state.user.dataUser.data);
  const [show, setShow] = useState(false);
  const [tablet, setTablet] = useState(false);
  const navigate = useNavigate();

  let dropdownRef = useRef();
  let sidebarRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (dropdownRef.current && !sidebarRef.current.contains(e.target)) {
        setTablet(false);
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  })

  const closeNavbar = () => {
    setTablet(false);
  };



  useEffect(() => {
    if (currentUser) {
      getUser(currentUser?.id, dispatch);
    }
  }, [currentUser, dispatch]);

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <i className="ri-home-heart-fill"></i>
          <span>Soma Recommend</span>
        </Link>
        {
          <div className={tablet ? "nav-links nav-tablet" : "nav-links"} ref={sidebarRef}>
            <ul className={"navbar"}>
              <GrClose
                id="close-navbar-icon"
                onClick={() => setTablet(!tablet)}
              />
              <i
                className="ri-home-heart-fill navbar-item"
                onClick={() => {
                  navigate("/");
                  closeNavbar();
                }}
              ></i>
              <li className="navbar-item" onClick={closeNavbar}>
                <NavLink to="search">Tìm kiếm</NavLink>
              </li>
              <li className="navbar-item" onClick={closeNavbar}>
                <NavLink to="share">Chia sẻ</NavLink>
              </li>
              <li className="navbar-item" onClick={closeNavbar}>
                <NavLink to="author">Cộng đồng</NavLink>
              </li>
            </ul>
          </div>
        }
        {currentUser ? (
          <div className="main" ref={dropdownRef}>
            <DropDownNavbar userInfo={dataUser} setShow={setShow} />
            <div
              className="bx bx-menu"
              id="menu-icon"
              onClick={() => setTablet(!tablet)}
            ></div>
          </div>
        ) : (
          <div className="main">
            <Link
              onClick={() => dispatch(clearRedux())}
              to="login"
              className="user-login-link"
            >
              <i className="ri-user-fill"></i>Đăng nhập
            </Link>
            <Link onClick={() => dispatch(clearRedux())} to="register">
              Đăng ký
            </Link>
            <div
              className="bx bx-menu"
              id="menu-icon"
              onClick={() => setTablet(!tablet)}
            ></div>
          </div>
        )}
      </div>
      <div className="App-content">
        <Outlet />
        <Profile show={show} setShow={setShow} />
      </div>
    </>
  );
}

export default Navbar;