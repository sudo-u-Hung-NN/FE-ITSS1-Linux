import Parser from "html-react-parser";
import React from "react";
import Convert from "../../OtherComponent/Translate/Translate"

export const Note = ({dishData}) => {
    return (
        <div className="description-0">
            <h3>Chú ý</h3>
            <p>{Parser(dishData?.data[0]?.note)}</p>
        </div>
    )
}