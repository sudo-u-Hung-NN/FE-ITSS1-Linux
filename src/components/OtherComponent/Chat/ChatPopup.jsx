import React from 'react'
import "../../../CSS/chat.scss";
import { AiOutlineClose } from "react-icons/ai";

const ChatPopup = () => {

    const avatarUser = "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";

    return (
        <div className='chat-container'>
            <div className="chat__header">
                <img src={avatarUser} alt="avatar" className='chat__header__avatar' />
                <span>Creator's name</span>
                    <AiOutlineClose className='close-popup'/>
            </div>
            <div className="chat__body">
                body
            </div>
            <div className="chat__footer">
                footer
            </div>
        </div>
    )
}

export default ChatPopup
