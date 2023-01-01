import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import AnimateHeight from 'react-animate-height';
import { logoutUser } from '../../Api/auth.api';

const DropdownNavbar = ({ height, currentUser , closeDropdown}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeDropdownNavbar = () => {
        closeDropdown(0);
    }

    return (
        <AnimateHeight
            className='sub-menu-wrap'
            id='subMenu'
            duration={300}
            height={height}
        >
            <div className='sub-menu'>
                <div className='user-info'
                    onClick={() => {
                        navigate('/profile')
                        closeDropdownNavbar();
                    }}
                >
                    <img src={currentUser?.avatarUrl} alt="" />
                    <h3>{currentUser?.username}</h3>
                </div>
                <hr />

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('/profile')
                        closeDropdownNavbar();
                    }}
                >
                    <HiUser className='sub-menu-link-before' />
                    <p>Profile manager & edit</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('/settings')
                        closeDropdownNavbar();
                    }}
                >
                    <IoMdSettings className='sub-menu-link-before' />
                    <p>Settings</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        closeDropdownNavbar();
                        logoutUser(dispatch, navigate);
                    }}
                >
                    <IoLogOut className='sub-menu-link-before' />
                    <p>Sign out</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>
            </div>
        </AnimateHeight>
    )
}

export default DropdownNavbar