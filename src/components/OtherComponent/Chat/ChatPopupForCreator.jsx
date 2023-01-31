import React, { useState } from 'react'
import "../../../CSS/chat.scss";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { createMessage, getMessage } from '../../Api/chat.api';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const ChatPopupForCreator = ({ creator, sender, recipe_id, showPopupChat, setShowPopupChat }) => {

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [currentChat, setCurrentChat] = useState([]);

    console.log({ creator, sender, recipe_id });

    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema: yup.object().shape({
            content: yup.string().required('required')
        }),
        onSubmit: values => {
            createMessage({
                sender_id: creator.id,
                reciver_id: sender.id,
                content: values.content, recipe_id
            })
                .then(() => {
                    values.content = '';
                    getCurrentChat();
                }).catch(err => {
                    console.log(err);
                })
                ;
            console.log({
                sender_id: creator.id,
                reciver_id: sender.id,
                content: values.content, recipe_id
            });
        }
    })

    function getCurrentChat() {
        const sender_id = creator.id;
        const reciver_id = sender.id;
        getMessage(sender_id, reciver_id, recipe_id)
            .then((res) => {
                console.log(res.data);
                setCurrentChat(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCurrentChat();
    }, [sender])

    return (
        <div className="chatbox-wrapper">
            {showPopupChat && <div className="chatbox-message-wrapper">
                <div className="chatbox-massage-header">
                    <div className="chatbox-message-profile">
                        <img
                            src={sender?.avatar ? sender?.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt=""
                            className="chatbox-message-image"
                        />
                        <div>
                            <h4 className="chatbox-message-name">{sender?.username}</h4>
                            <p className="chatbox-message-status">Đang hoạt động</p>
                        </div>
                    </div>
                    <div className="chatbox-message-wrapper-close"
                        onClick={() => setShowPopupChat(false)}
                    >
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="chatbox-message-content">
                    {currentChat.length === 0 && <h4 className="chatbox-message-no-message">Chat với tôi</h4>}
                    {currentChat && currentChat.map(chat => {
                        const time = new Date(chat.time)
                        return (
                            <React.Fragment key={chat.id}>
                                {chat.sender_id === creator.id &&
                                    <div className="chatbox-message-item sent">
                                        <span className="chatbox-message-item-text">
                                            {chat.content}
                                        </span>
                                        <span className="chatbox-message-item-time">{time.toUTCString()}</span>
                                    </div>
                                }
                                {chat.sender_id === sender.id &&
                                    <div className="chatbox-message-item received">
                                        <span className="chatbox-message-item-text">
                                            {chat.content}
                                        </span>
                                        <span className="chatbox-message-item-time">{time.toUTCString()}</span>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chatbox-message-bottom">
                    <form className="chatbox-message-form"
                        onSubmit={formik.handleSubmit}
                    >
                        <textarea
                            rows="1"
                            placeholder="Nhập tin nhắn..."
                            className="chatbox-message-input"
                            name='content'
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                        <button type="submit" className="chatbox-message-submit">
                            <IoMdSend className='chatbox-message-submit-icon' />
                        </button>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default ChatPopupForCreator
