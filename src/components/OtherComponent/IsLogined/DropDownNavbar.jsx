import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Api/auth.api";

const DropDownNavbar = ({ userInfo, setShow, show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dropdown className="navbar-dropdown">
      <Dropdown.Toggle
        className="navbar-dropdown-toggle"
        variant="#111"
        id="dropdown-button-dark-example1"
      >
        <img
          className="navbar-dropdown-toggle-avatar"
          src={
            userInfo?.avatar ||
            "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" ||
            userInfo?.avatar
          }
          alt=""
        />
        {userInfo?.username}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "250px" }}>
        <Dropdown.Item
          style={({ width: "100%" }, { marginLeft: "0" })}
          href="#/action-1"
        >
          Cài đặt
        </Dropdown.Item>
        <Dropdown.Item
          style={({ width: "250px" }, { marginLeft: "0" })}
          href="#/action-2"
          onClick={() => setShow(true)}
        >
          Thông tin cá nhân
        </Dropdown.Item>
        <Dropdown.Item
          style={{ width: "250px", marginLeft: "0" }}
          onClick={() => {
            // localStorage.clear();
            logoutUser(dispatch, navigate);
          }}
        >
          Đăng xuất
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownNavbar;
