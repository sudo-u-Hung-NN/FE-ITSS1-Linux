import React from 'react'
import AnimateHeight from 'react-animate-height'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GrFormNext } from 'react-icons/gr'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5';
import { logoutUser } from '../../Api/auth.api'
import { RiVipDiamondFill } from 'react-icons/ri'

const DropdownMenu = ({ userInfo, height, vip, setHeight, setShow, setShowVip, setVip }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeDropdownNavbar = () => {
        setHeight(0);
    }

    return (
        <AnimateHeight
            duration={300}
            height={height}
            className='sub-menu-wrap'
            id='subMenu'
        >
            <div className='sub-menu'>
                <div className='user-info'
                    onClick={() => {
                        setShow(true)
                        closeDropdownNavbar();
                    }}
                >
                    <img src={userInfo.avatar ? userInfo.avatar : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} alt="" />
                    <h3>{userInfo.username}</h3>
                </div>
                <hr />

                <div className='sub-menu-link'
                    onClick={() => {
                        closeDropdownNavbar()
                        setShowVip(true);
                    }}
                >
                    <RiVipDiamondFill className='sub-menu-link-before' />
                    <p>VIP {vip}</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('#')
                        closeDropdownNavbar();
                    }}
                >
                    <IoMdSettings className='sub-menu-link-before' />
                    <p>Cài đặt</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        closeDropdownNavbar();
                        logoutUser(dispatch, navigate);
                    }}
                >
                    <IoLogOut className='sub-menu-link-before' />
                    <p>Đăng xuất</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>
            </div>

        </AnimateHeight>
    )
}

export default DropdownMenu