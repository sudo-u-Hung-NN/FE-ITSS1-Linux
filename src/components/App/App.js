import Navbar from "./Navbar";
import "../../CSS/app.css";
import { Route, Routes } from "react-router-dom";
import Search from "../Dashboard/Search";
import Author from "../Dashboard/Author";
import Share from "../Dashboard/Share";
import React from "react";
import Login from "../Authentication/Login/Index";
import Register from "../Authentication/Register/Index";
import FormForget from "../Authentication/ForgetPassword/Index";
import Home from "../Dashboard/Home";
import Dish from "../Dish/Dish";
import ModalLogin from "../Dish/DishVote/ModalLogin";
import { Description } from "../Dish/DishOption/Description";
import { Formula } from "../Dish/DishOption/Formula";
import { Note } from "../Dish/DishOption/Note";
import VideoTutorial from "../Dish/DishOption/VideoTutorial";
import { getVip } from "../../Redux/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVIPUser } from "../Api/user.api";

function App() {

  const currentUser = useSelector(state => state.auth.login.currentUser);
  const dispatch = useDispatch();

  if (currentUser) {
    getVIPUser(currentUser.id)
      .then((response) => {
        if (response.data === null) {
          dispatch(getVip(0))
        } else {
          dispatch(getVip(response.data.vip_option))
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="author" element={<Author />} />
        <Route path="share" element={<Share />} />
        <Route path="register" element={<Register />} />
        <Route path="forget" element={<FormForget />} />
        <Route path="login" element={<Login />} />
        <Route path="dish/:id" element={<Dish />}>
          <Route path="description" element={<Description />} />
          <Route path="formula" element={<Formula />} />
          <Route path="note" element={<Note />} />
          <Route path="video" element={<VideoTutorial />} />
        </Route>
        <Route path="button" element={<ModalLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
