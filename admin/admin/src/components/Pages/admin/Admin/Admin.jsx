import React, { useEffect, useState } from "react";
import LeftPage from "./components/leftPage/LeftPage";
import RightPage from "./components/rightPage/RightPage";
import "./admin.scss";
import { useNavigate, Link } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const [itemLocal, setItemLocal] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("key"));
    setItemLocal(localStorage.getItem("key"));
  }, [setItemLocal, localStorage]);
  // useEffect(() => {
  //   if (!itemLocal) {
  //     navigate("/login");
  //   }
  // });
  return (
    <>
      {itemLocal ? (
        <div className="admin">
          <LeftPage />
          <RightPage />
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            textAlign: "center",
            color: "#660066",
            border: "solid 2px #660066",
            paddingTop: "50px",
          }}
        >
          Bạn chưa đăng nhập
        </Link>
      )}
    </>
  );
};

export default Admin;
