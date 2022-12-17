import React from "react";
import "./dishOption.scss";
import {NavLink} from "react-router-dom";
export default function DishOption({ setOption }) {
  return (
    <div className="dish-option">
      <NavLink
          to='description'
          onClick={() => setOption(0)} className="dish-option-description"
      >
        Description
      </NavLink>
      <NavLink
          to='formula'
          onClick={() => setOption(1)} className="dish-option-proccessing"
      >
        Formula
      </NavLink>
      <NavLink
          to='note'
          onClick={() => setOption(2)} className="dish-option-storage"
      >
        Note
      </NavLink>
    </div>
  );
}
