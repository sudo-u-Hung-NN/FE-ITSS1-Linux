import React, { useState } from "react";
import FormLoginAdmin from "../../../../FormLogin/FormLoginAdmin/FormLoginAdmin";
import AdminTable from "./AdminTable";
export default function AdminMain() {
  console.log(process.env.REACT_APP_ADMIN_PASSWORD);
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = (a) => {
    if (a === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsLogin(true);
    }
  };
  return (
    <div className="right-admin-main-table">
      <AdminTable />
    </div>
  );
}
