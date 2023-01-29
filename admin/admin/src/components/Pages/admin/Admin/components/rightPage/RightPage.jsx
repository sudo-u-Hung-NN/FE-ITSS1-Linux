import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../../../api/apiUser";
import AdminMain from "../../Main/AdminMain";
import "./rightPage.scss";
const RightPage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getAllRecipes()
      .then((res) => {
        console.log(res);
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRecipes, getAllRecipes]);
  return (
    <div className="right-admin-bgr">
      <div className="right-admin">
        <div className="right-admin-total">
          <h1 className="right-admin-total-title">Totals</h1>
          <div className="right-admin-total-item">
            <div className="right-admin-total-item-recipes">
              {recipes.length} món ăn
            </div>
            <div className="right-admin-total-item-vip-options">4 gói vip</div>
            <div className="right-admin-total-item-users">
              253 người sử dụng
            </div>
          </div>
        </div>
        <div className="right-admin-main">
          <div className="right-admin-main-head">
            <div className="right-admin-main-head-title">Người dùng</div>
            <div className="right-admin-main-head-search">
              <input type="text" name="" id="" placeholder="Search ..." />
              <button type="button">Tìm kiếm</button>
            </div>
          </div>
          <AdminMain />
        </div>
      </div>
    </div>
  );
};

export default RightPage;
