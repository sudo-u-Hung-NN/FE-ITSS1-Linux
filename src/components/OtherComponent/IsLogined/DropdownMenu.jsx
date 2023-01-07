import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GrFormNext } from 'react-icons/gr'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5';
import { logoutUser } from '../../Api/auth.api'
import { RiVipDiamondFill } from 'react-icons/ri'
import { addVIPForUser, getVIPUser, upgradeVIPForUser } from '../../Api/user.api'
import swal from 'sweetalert'

const DropdownMenu = ({ userInfo, height, setHeight, setShow }) => {

    const [vip, setVip] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeDropdownNavbar = () => {
        setHeight(0);
    }

    const handleAddVIPUser = (option) => {
        addVIPForUser({
            user_id: userInfo.id,
            vip_option: option,
            expireDate: new Date()
        })
            .then(res => {
                console.log(res.data);
                setVip(res.data.vip_option);
                return res.data.vip_option
            })
            .then((vip_option) => {
                vip_option === 1 ? (
                    swal({
                        icon: "success",
                        text: "Mua VIP 1 thành công!"
                    })
                ) : (
                    swal({
                        icon: "success",
                        text: "Mua VIP vĩnh viễn thành công!"
                    })
                )
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpgradeVIPUser = () => {
        upgradeVIPForUser(userInfo.id)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const gotoVIP = (vip) => {
        switch (vip) {
            case 0:
                swal({
                    text: "Tài khoản của bạn chưa mua VIP",
                    buttons: {
                        cancel: "Thoát",
                        vip1: {
                            text: "Mua VIP 1",
                            value: "vip1"
                        },
                        vip2: {
                            text: "Mua VIP Vĩnh viễn",
                            value: "vip2"
                        }
                    }
                }).then((value) => {
                    switch (value) {
                        case "vip1":
                            handleAddVIPUser(1);
                            break;
                        case "vip2":
                            handleAddVIPUser(2);
                            break;
                        default:
                    }
                })
                break;
            case 1:
                swal({
                    text: "Bạn đang sở hữu tài khoản VIP 1",
                    buttons: {
                        cancel: "Thoát",
                        vip1: {
                            text: "Nâng cấp VIP",
                            value: "vip"
                        }
                    }
                }).then(value => {
                    handleUpgradeVIPUser();
                })
                break;
            case 2:
                swal({
                    text: "Bạn đang sở hữu tài khoản VIP vĩnh viễn!"
                })
                break;
            default:

        }
    }

    useEffect(() => {
        getVIPUser(userInfo.id)
            .then(res => {
                res.data.id && setVip(1);
            }).catch(err => {
                console.log(err);
            })
    })

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
                        gotoVIP(vip)
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