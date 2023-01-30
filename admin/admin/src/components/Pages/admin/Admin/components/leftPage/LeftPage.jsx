import React from "react";
import { BsBellFill, BsTools } from "react-icons/bs";
import "./leftPage.scss";
const LeftPage = () => {
  return (
    <div className="left-admin">
      <div className="left-admin-info">
        <div className="left-admin-info-avt">
          <img
            className="left-admin-info-avt-img"
            src="https://danviet.mediacdn.vn/2020/10/27/2-16037897686341859390320.jpg"
            alt=""
          />
        </div>
        <div className="left-admin-info-name">Admin</div>
        <div className="left-admin-info-option">
          <div className="left-admin-info-option-left">
            <BsBellFill />
          </div>
          <div className="left-admin-info-option-right">
            <BsTools />
          </div>
        </div>
      </div>
      <div className="left-admin-option">
        <h3 className="left-admin-option-title">Main Navigation</h3>
        <div className="left-admin-option-item">
          <div className="left-admin-option-item-user">User</div>
          <div className="left-admin-option-item-recipe">Recipe</div>
        </div>
      </div>
    </div>
  );
};

export default LeftPage;
