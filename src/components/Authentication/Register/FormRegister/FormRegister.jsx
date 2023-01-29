import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessageAuth from "../../ErrorMessage/ErrorMessageAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Api/auth.api";
import { clearRedux } from "../../../../Redux/auth.slice";

export default function FormRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMessageError } = useSelector((state) => state.auth.register);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClass = (name, baseClass = "form-control") =>
    `${baseClass} ${errors[name] ? "is-invalid" : ""}`;

  const onSubmit = (data) => {
    console.log(data);
    const fixData = { ...data, qid: Number(data.question), status: 0 };
    registerUser(fixData, dispatch, navigate);
  };

  const mockup_questions = [
    { id: 1, content: "Gia đình bạn có bao nhiêu người ?" },
    { id: 2, content: "Bạn sống ở đâu lúc 6 tuổi ?" },
    { id: 3, content: "Tên trường tiểu học của bạn là gì ?" },
  ];

  // TODO: FE - done, BE - none

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Đăng ký</h3>
      <div className="mb-3">
        <label>Tên người dùng</label>
        <input
          name="username"
          {...register("username", {
            required: { value: true, message: "Bạn phải điền tên người dùng" },
            maxLength: {
              value: 20,
              message: "Tên người dùng phải ngắn hơn 20 ký tự",
            },
            minLength: {
              value: 4,
              message: "Tên người dùng phải dài hơn 20 ký tự",
            },
          })}
          type="text"
          className={handleClass("username")}
          placeholder="Tên người dùng"
        />
        <ErrorMessageAuth name="name" errors={errors} />
      </div>

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
          className={handleClass("email")}
          placeholder="Điền email"
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
          className={handleClass("password")}
          placeholder="Nhập mật khẩu"
        />
        <ErrorMessageAuth name="password" errors={errors} />
      </div>

      <div className="mb-3">
        <label>Câu hỏi bí mật</label>
        <select {...register("question")} className={handleClass("question")}>
          <option value="" disabled hidden>
            Chọn câu hỏi
          </option>
          {mockup_questions?.map((item) => (
            <option value={item["id"]} key={item.id}>
              {item["content"]}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Trả lời</label>
        <input
          {...register("answer", {
            required: { value: true, message: "Bạn phải trả lời câu hỏi" },
            minLength: {
              value: 0,
              message: "Câu trả lời phải nhiều hơn 0 ký tự",
            },
            maxLength: {
              value: 99,
              message: "Câu trả lời phải ít hơn 99 ký tự",
            },
          })}
          type="text"
          className={handleClass("answer")}
          placeholder="Nhập câu trả lời"
        />
        <ErrorMessageAuth name="answer" errors={errors} />
      </div>

      {registerMessageError && (
        <div className="text-danger">{registerMessageError}</div>
      )}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Đăng ký
        </button>
      </div>
      <p className="forgot-password text-right">
        Đã có tài khoản ?{" "}
        <Link onClick={() => dispatch(clearRedux())} to="/login">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
