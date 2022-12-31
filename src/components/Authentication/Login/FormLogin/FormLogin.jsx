import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearRedux } from "../../../../Redux/auth.slice";
import ErrorMessageAuth from "../../ErrorMessage/ErrorMessageAuth";
import { loginUser } from "../../../Api/auth.api";
export default function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUserError } = useSelector((state) => state.auth.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage(currentUserError);
  }, [currentUserError, setErrorMessage]);
  const handleClass = (name, baseClass = "form-control") =>
    `${baseClass} ${errors[name] ? "is-invalid" : ""}`;
  const onSubmit = (data) => {
    loginUser(data, dispatch, navigate);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Welcome to Soma Team</h3>
      <div className="mb-3">
        <label>Email</label>
        <input
          {...register("email", {
            required: { value: true, message: "Bạn phải điền email" },
            maxLength: { value: 99, message: "email phải ngắn hơn 99 ký tự" },
            minLength: { value: 10, message: "email phải dài hơn 10 ký tự" },
            validate: {
              email: (v) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
                "email không hợp lệ",
            },
          })}
          type="email"
          name="email"
          className={handleClass("email")}
          placeholder="Nhập email"
        />
        <ErrorMessageAuth name="email" errors={errors} />
      </div>

      <div className="mb-3">
        <label>Mật khẩu</label>
        <input
          {...register("password", {
            required: { value: true, message: "Bạn phải nhập mật khẩu" },
            minLength: {
              value: 6,
              message: "Mật khẩu phải dài hơn 6 ký tự",
            },
            maxLength: {
              value: 99,
              message: "Mật khẩu phải ngắn hơn 99 ký tự",
            },
          })}
          type="password"
          name="password"
          className={handleClass("password")}
          placeholder="Nhập mật khẩu"
        />
        <ErrorMessageAuth name="password" errors={errors} />
      </div>

      {errorMessage && (
        <div className="text-danger" style={{ fontSize: "small" }}>
          {errorMessage}
        </div>
      )}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#007074" }}
        >
          Login
        </button>
      </div>
      <p className="form-login-signup text-right">
        Chưa có tài khoản ?{" "}
        <Link to="/register" onClick={() => dispatch(clearRedux())}>
          Đăng ký
        </Link>
      </p>
      <p className="form-login-signup text-right">
        Quên mật khẩu ?{" "}
        <Link to="/forget" onClick={() => dispatch(clearRedux())}>
          Lấy lại mật khẩu
        </Link>
      </p>
    </form>
  );
}
