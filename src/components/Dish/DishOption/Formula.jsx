import Parser from "html-react-parser";
import React from "react";

export const Formula = ({dishData}) => {
    return (
        <div className="description-0">
            <h3>Công thức</h3>
            <p>{Parser(dishData?.data[0].formula)}</p>
        </div>
    )
}