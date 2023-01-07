import Parser from "html-react-parser";
import React from "react";
import Convert from "../../Api/translate.api"

export const Formula = ({ dishData }) => {
    return (
        <div className="description-0">
            <h3>Công thức</h3>
            <p>{Convert(Parser(dishData?.data[0].formula))}</p>
        </div>
    )
}