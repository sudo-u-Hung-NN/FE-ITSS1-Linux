import React from 'react'
import { useSelector } from 'react-redux';

const ProfileDetails = () => {

    const currentUser = useSelector((state) => state.user.dataUser.data);
    return (
        <div className='content'>
            <div className='details'>
                <h2>
                    👤{currentUser.username}
                </h2>

                <span className='birth_date'>Ngày sinh:
                    <p>{currentUser.birth_date}</p>
                </span>

                <span className='gender'>
                    Giới tính:
                    <p>{currentUser.gender}</p>
                </span>

                <span className='email'>
                    Email: <p> {currentUser.email} </p>
                </span>

                <span className='phone'>
                    SĐT:
                    <p>{currentUser.phone}</p>
                </span>
            </div>
        </div>
    )
}

export default ProfileDetails