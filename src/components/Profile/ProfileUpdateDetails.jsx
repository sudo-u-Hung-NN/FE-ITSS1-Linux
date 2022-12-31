import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../Api/user.api";
import { ToastContainer, toast } from "react-toastify";

const ProfileUpdateDetails = ({ setUpdateDetails }) => {
  const currentUser = useSelector((state) => state.user.dataUser.data);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: currentUser?.email,
      username: currentUser?.username,
      phone: currentUser?.phone,
      birth_date: currentUser?.birth_date,
      avatar: currentUser?.avatar,
      gender: currentUser?.gender,
    },
    onSubmit: (values) => {
      updateUser(currentUser.id, values, dispatch, toast);
      console.log("OBJ for update: ", formik.values);
      setTimeout(() => {
        setUpdateDetails(false);
      }, 1000);
    },
  });

  return (
    <>
      <div className="content">
        <div className="details">
          👤
          <span>
            Tên người dùng:
            <input
              type="text"
              id="username"
              name="username"
              placeholder={currentUser.username}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </span>
          <span className="birth_date">
            Ngày sinh:
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formik.values.birth_date}
              onChange={formik.handleChange}
            />
          </span>
          <span className="gender">
            Giới tính:
            <div>
              <div className="gender-item">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="MALE"
                  onChange={formik.handleChange}
                />
                Nam
              </div>
              <div className="gender-item">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="FEMALE"
                  onChange={formik.handleChange}
                />
                Nữ
              </div>
            </div>
          </span>
          <span className="phone">
            SĐT:
            <input
              type="text"
              placeholder="your phone"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </span>
        </div>
      </div>
      <div className="button">
        <button type="button" onClick={formik.handleSubmit}>
          Cập nhật
        </button>
        <button type="button" onClick={() => setUpdateDetails(false)}>
          Huỷ
        </button>
        <ToastContainer />
      </div>
    </>
  );
};
export default ProfileUpdateDetails;
