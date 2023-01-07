import Parser from "html-react-parser";
import React from "react";
import Convert from "../../Api/translate.api"

export const Note = ({ dishData }) => {
    return (
        <div className="description-0">
            <h3>Chú ý</h3>
            <p>{Convert(Parser(dishData?.data[0]?.note))}</p>
        </div>
    )
}