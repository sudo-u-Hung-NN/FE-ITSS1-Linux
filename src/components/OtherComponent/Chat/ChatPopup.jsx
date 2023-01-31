import React, { useState } from 'react'
import "../../../CSS/chat.scss";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { BsMessenger } from 'react-icons/bs';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { createMessage, getMessage } from '../../Api/chat.api';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const ChatPopup = ({ creator, recipe_id, sender_id, reciver_id }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [currentChat, setCurrentChat] = useState([]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);


    console.log({ creator, recipe_id, sender_id, reciver_id });

    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema: yup.object().shape({
            content: yup.string().required('required')
        }),
        onSubmit: values => {
            if (currentUser) {
                createMessage({ sender_id, reciver_id, content: values.content, recipe_id })
                    .then(() => {
                        values.content = '';
                        getCurrentChat();
                    }).catch(err => {
                        console.log(err);
                    })
                    ;
                console.log({ sender_id, reciver_id, content: values.content, recipe_id });
            } else {
                toast("Hãy đăng nhập trước khi Chat!")
            }
        }
    })

    const handleChangeShowPopup = () => {
        setShowPopup(!showPopup);
    }

    const getCurrentChat = () => {
        getMessage(sender_id, reciver_id, recipe_id)
            .then((res) => {
                setCurrentChat(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCurrentChat();
    }, [creator])

    return (
        <>
            <div className="chatbox-wrapper">
                <div className="chatbox-toggle"
                    onClick={handleChangeShowPopup}
                >
                    {/* <i className='bx bx-message-dots' ></i> */}
                    <BsMessenger/>
                </div>
                {showPopup && <div className="chatbox-message-wrapper">
                    <div className="chatbox-massage-header">
                        <div className="chatbox-message-profile">
                            <img
                                src={creator?.avatar ? creator?.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt=""
                                className="chatbox-message-image"
                            />
                            <div>
                                <h4 className="chatbox-message-name">{creator?.username}</h4>
                                <p className="chatbox-message-status">Đang hoạt động</p>
                            </div>
                        </div>
                        {/* <div className="chatbox-message-dropdown">
                        <i className='bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle' ></i>
                        <ul className="chatbox-message-dropdown-menu">
                            <li>
                                <a href="#">Search</a>
                            </li>
                            <li>
                                <a href="#">Report</a>
                            </li>
                        </ul>
                    </div> */}
                        <div className="chatbox-message-wrapper-close"
                            onClick={() => setShowPopup(false)}
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
                                    {chat.sender_id === sender_id &&
                                        <div className="chatbox-message-item sent">
                                            <span className="chatbox-message-item-text">
                                                {chat.content}
                                            </span>
                                            <span className="chatbox-message-item-time">{time.toUTCString()}</span>
                                        </div>
                                    }
                                    {chat.sender_id === reciver_id &&
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
            <ToastContainer/>
        </>
    )
}

export default ChatPopup
