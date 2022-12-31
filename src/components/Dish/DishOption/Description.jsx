import Parser from "html-react-parser";
import React from "react";
import Convert from "../../OtherComponent/Translate/Translate"

export const Description = ({dishData}) => {
    return (
        <div className="description-0">
            <h3>Miêu tả</h3>
            <p>{Parser(Convert(dishData?.data[0]?.description))}</p>
        </div>
    )
}