import React from "react";
import FormLoginAdmin from "./FormLoginAdmin/FormLoginAdmin";
import "./formLogin.scss";

const FormLogin = () => {
  return (
    <div className="form-login">
      <h1 className="form-login-title">Admin Page Login</h1>
      <FormLoginAdmin />
    </div>
  );
};

export default FormLogin;
