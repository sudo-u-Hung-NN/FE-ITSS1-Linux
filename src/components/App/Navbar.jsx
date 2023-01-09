import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearRedux } from "../../Redux/auth.slice";
import Profile from "../Profile/Profile";
import { GrClose } from "react-icons/gr";
import { getUser } from "../Api/user.api";
import DropdownMenu from "../OtherComponent/IsLogined/DropdownMenu";
import '../../CSS/dropdown.scss';
import VipContainer from "../OtherComponent/VIP/VipContainer";
import { getVIPUser } from "../Api/user.api";

function Navbar(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dataUser = useSelector((state) => state.user.dataUser.data);
  const [show, setShow] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [height, setHeight] = useState(0);
  const [showVip, setShowVip] = useState(false);
  const vip = useSelector(state => state.user.vipUser.vip);
  const navigate = useNavigate();

  let dropdownRef = useRef();
  let sidebarRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setTablet(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  useEffect(() => {
    let handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setHeight(0);
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

  useEffect(() => {
    if (currentUser) {
      getVIPUser(currentUser.id)
        .then(res => {
          // setVip(res.data.vip_option);
        }).catch(err => {
          console.log(err);
          // setVip(0);
        })
    }
  }, [])

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <i className="ri-home-heart-fill"></i>
          <span>Soma Recommend</span>
        </Link>
        {
          <div
            className={tablet ? "nav-links nav-tablet" : "nav-links"}
            ref={sidebarRef}
          >
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
            {/* <DropDownNavbar userInfo={dataUser} setShow={setShow} /> */}
            <img src={currentUser.avatar ? currentUser.avatar : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
              alt=''
              className='user-pic'
              aria-expanded={height !== 0}
              onClick={() => setHeight(height === 0 ? "auto" : 0)}
            />
            <DropdownMenu
              height={height}
              userInfo={currentUser}
              vip={vip}
              setHeight={setHeight}
              setShow={setShow}
              setShowVip={setShowVip} />
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
        {showVip && <VipContainer setShowVip={setShowVip} />}
      </div>
    </>
  );
}

export default Navbar;
