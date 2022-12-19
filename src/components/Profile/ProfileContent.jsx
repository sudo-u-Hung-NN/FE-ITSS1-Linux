import React, { useState } from "react";
import "../../CSS/profile.css";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "date-fns";
import { MdFileUpload } from "react-icons/md";
import ProfileUpdateDetails from "./ProfileUpdateDetails";
import ProfileDetails from "./ProfileDetails";
import ProfileUpdatePassword from "./ProfileUpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToCloudinary } from "../Api/upload.api";
import { updateUser } from "../Api/user.api";
import { toast } from "react-toastify";

const ProfileContent = ({ setShow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.dataUser.data);

  const [updateDetails, setUpdateDetails] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [image, setImage] = useState(user?.avatar);

  const handleChangeImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    uploadImageToCloudinary(formData)
      .then((res) => {
        return res.data.url;
      })
      .then((res) => {
        setImage(res);
        console.log("image", res);
        updateUser(
          user?.id,
          {
            username: user?.username,
            phone: user?.phone,
            birth_date: user?.birth_date,
            avatar: res,
            gender: user?.gender,
          },
          dispatch,
          toast
        );
      })
      .catch((err) => {
        console.error("Err: ", err);
      });
  };
  return (
    <div className="profile">
      <AiOutlineClose
        fontSize={25}
        id="icon-close-profile"
        onClick={() => setShow(false)}
      />
      <div className="profile-content">
        <div className="image">
          <img
            src={
              image ||
              user?.avatar ||
              `https://cdn-icons-png.flaticon.com/512/149/149071.png`
            }
            alt=""
          />
          <label htmlFor="avt">
            <MdFileUpload className="icon-upload-image" />
          </label>
          <input
            type="file"
            name="avt"
            id="avt"
            className="profile-avt"
            onChange={handleChangeImage}
          />
          {/* {currentUser.avatar} */}
        </div>
        <div className="media-icons">
          <BsFacebook className="icon" fontSize={20} />
          <BsTwitter className="icon" fontSize={20} />
          <BsGoogle className="icon" fontSize={20} />
        </div>
        {updatePassword ? (
          <ProfileUpdatePassword setUpdatePassword={setUpdatePassword} />
        ) : (
          <>
            {updateDetails ? (
              <ProfileUpdateDetails setUpdateDetails={setUpdateDetails} />
            ) : (
              <ProfileDetails />
            )}
            <div className="button">
              {!updateDetails && (
                <button type="button" onClick={() => setUpdateDetails(true)}>
                  Update Your Profile
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {!updatePassword && (
        <span
          className="update-password"
          onClick={() => setUpdatePassword(true)}
        >
          Update your password
        </span>
      )}
    </div>
  );
};
export default ProfileContent;
