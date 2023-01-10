import Parser from "html-react-parser";
import React from "react";

export const Description = ({ dishData }) => {
    return (
        <div className="description-0">
            <h3>Miêu tả</h3>
            <p>{Parser(dishData?.data[0]?.description)}</p>
        </div>
    )
}