import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessageAuth from "../../Authentication/ErrorMessage/ErrorMessageAuth";
import { loginUserModal } from "../../Api/auth.api";
import "./formLoginModal.scss";
export default function FormLoginModal({ hide }) {
  const dispatch = useDispatch();
  const { currentUserError } = useSelector((state) => state.auth.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(currentUserError);
  }, [currentUserError, setErrorMessage]);

  const handleClass = (name, baseClass = "form-control") =>
    `${baseClass} ${errors[name] ? "is-invalid" : ""}`;

  const onSubmit = (data) => {
    loginUserModal(data, dispatch);
    hide();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          value={email}
          className={handleClass("email")}
          placeholder="Enter email"
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
        <button type="submit" className="btn btn-primary modal-login-button">
          Đăng nhập
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{ backgroundColor: "rgba(218, 30, 81, 0.8)" }}
          onClick={hide}
        >
          Huỷ
        </button>
      </div>
    </form>
  );
}
