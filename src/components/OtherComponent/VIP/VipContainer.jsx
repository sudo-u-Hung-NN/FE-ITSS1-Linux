import React from 'react'
import swal from 'sweetalert'
import '../../../CSS/vip.scss';
import { addVIPForUser, upgradeVIPForUser } from '../../Api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { buyVip, upgradeVip } from '../../../Redux/user.slice';

const VipContainer = ({ setShowVip }) => {

    const currentUser = useSelector(state => state.auth.login.currentUser)
    const vip = useSelector(state => state.user.vipUser.vip);
    const dispatch = useDispatch();

    const handleBuyVIPUser = (option) => {
        addVIPForUser({
            user_id: currentUser.id,
            vip_option: option,
            expireDate: new Date()
        })
            .then(res => {
                console.log(res.data);
                dispatch(buyVip(res.data.vip_option))
                return res.data.vip_option
            })
            .then((vip_option) => {
                switch (vip_option) {
                    case 1:
                        swal({
                            icon: "success",
                            text: "Mua VIP 1 thành công!",
                            button: "Thoát"
                        }).then(() => {
                            setShowVip(false)
                        })
                        break;
                    case 2:
                        swal({
                            icon: "success",
                            text: "Mua VIP vĩnh viễn thành công!",
                            button: "Thoát"
                        }).then((value) => {
                            setShowVip(false)
                        })
                        break;
                    default:
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpgradeVIPUser = () => {
        console.log("nâng cấp vip");
        upgradeVIPForUser(currentUser.id)
            .then(res => {
                console.log(res);
                dispatch(upgradeVip(res.data.vip_option));
                swal({
                    icon: "success",
                    title: "Chúc mừng",
                    text: "Bạn đã sở hữu tài khoản VIP vĩnh viễn",
                    button: "Thoát"
                }).then(() => {
                    setShowVip(false)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='vip-container'>
            <div className='vip-popup'>
                <div className='popup-title'>
                    ⭐ Mua VIP ⭐
                </div>
                <div className='popup-content'>
                    <div className='input-container'>
                        <label htmlFor='bank-name'>Tên ngân hàng: </label>
                        <input
                            type="text"
                            id='bank-name'
                            placeholder='VD: Vietcombank'
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='stk-name'>Số tài khoản: </label>
                        <input
                            type="text"
                            id='stk-name'
                            placeholder='VD: 1234 567 899'
                        />
                    </div>
                </div>
                <div className='popup-footer'>
                    <button
                        className='btn-cancel'
                        onClick={() => setShowVip(false)}
                    >
                        Thoát
                    </button>
                    <button
                        onClick={() => {
                            switch (vip) {
                                case undefined:
                                    handleBuyVIPUser(1);
                                    break
                                case 1:
                                    swal({
                                        icon: 'warning',
                                        text: "Bạn đang sở hữu tài khoản VIP 1 và không thể mua lại! Bạn có thể lựa chọn nâng cấp lên tài khoản VIP vĩnh viễn!",
                                        button: "Thoát"
                                    }).then(() => {
                                        setShowVip(false);
                                    })
                                    break
                                case 2:
                                    swal({
                                        icon: 'warning',
                                        text: "Bạn đang sở hữu tài khoản VIP vĩnh viễn, không thể mua hay nâng cấp VIP nữa!",
                                        button: "Thoát"
                                    }).then(() => {
                                        setShowVip(false);
                                    })
                                    break
                                default:
                                    console.log("Mua vip 1");
                            }
                        }}
                    >
                        Mua VIP 1
                    </button>
                    <button
                        onClick={() => {
                            switch (vip) {
                                case undefined:
                                    handleBuyVIPUser(2);
                                    break
                                case 1:
                                    handleUpgradeVIPUser();
                                    break
                                case 2:
                                    swal({
                                        icon: 'warning',
                                        text: "Bạn đang sở hữu tài khoản VIP vĩnh viễn, không thể mua hay nâng cấp VIP nữa!"
                                    }).then(() => {
                                        setShowVip(false);
                                    })
                                    break
                                default:
                                    console.log("Mua vip 2");
                                    break;
                            }
                        }}
                    >
                        Mua VIP vĩnh viễn
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VipContainer