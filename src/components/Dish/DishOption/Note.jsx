import Parser from "html-react-parser";
import React from "react";

export const Note = ({dishData}) => {
    return (
        <div className="description-0">
            <h3>Note</h3>
            <p>{Parser(dishData?.data[0]?.note)}</p>
        </div>
    )
}