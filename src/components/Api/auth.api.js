import axios from "axios";
import { toast } from "react-toastify";
import {
  registerStart,
  loginError,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  clearRedux,
  registerError,
} from "../../Redux/auth.slice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/login", user);
    if (res.data === "account bị block") {
      dispatch(loginError("Tài khoản đã bị block !!!"));
    } else {
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem(
        "access_token",
        JSON.stringify(res.data.access_token)
      );
      localStorage.setItem(
        "currentUserLoggedIn",
        JSON.stringify(res.data.user)
      );
      navigate("/");
    }
  } catch (err) {
    if (err.response) {
      dispatch(loginError("* Tài khoản hoặc mật khẩu không đúng!!!"));
    }
  }
};

export const validatePasswordForUpdate = async (user) => {
  return await axios.post("http://localhost:3000/login", user);
};

export const loginUserModal = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/login", user);
    if (res.data === "account bị block") {
      dispatch(loginError("Tài khoản đã bị block !!!"));
    } else {
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem(
        "access_token",
        JSON.stringify(res.data.access_token)
      );
      localStorage.setItem(
        "currentUserLoggedIn",
        JSON.stringify(res.data.user)
      );
    }
  } catch (err) {
    if (err.response) {
      dispatch(loginError("* Tài khoản hoặc mật khẩu không đúng!!!"));
    }
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3000/user", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerError("* Email is invalid or already exists"));
  }
};
export const logoutUser = (dispatch, navigate) => {
  localStorage.clear();
  dispatch(logoutSuccess());
  navigate("/");
};

export const deleteError = (dispatch, navigate) => {
  dispatch(clearRedux());
  navigate("/login");
};

export const getPassword = async (data) => {
  try {
    return await axios.post("http://localhost:3000/user/forgotPassword", data);
  } catch (err) {
    return err;
  }
};
