import React from 'react'
import swal from 'sweetalert'
import '../../../CSS/vip.scss';
import { addVIPForUser, upgradeVIPForUser } from '../../Api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { buyVip, upgradeVip } from '../../../Redux/user.slice';
import { useFormik } from 'formik';
import * as yup from 'yup'

const VipContainer = ({ setShowVip }) => {

    const currentUser = useSelector(state => state.auth.login.currentUser)
    const vip = useSelector(state => state.user.vipUser.vip);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            bankName: '',
            accountNumber: ''
        },
        validationSchema: yup.object().shape({
            bankName: yup.string().required('required'),
            accountNumber: yup.number().min(1).required('required'),
        }),
        onSubmit: values => {
            console.log(values);
            swal({
                text: "Hãy lựa chọn",
                buttons: {
                    cancel: "Thoát",
                    buy1: "Mua VIP 1",
                    buy2: "Mua VIP Vĩnh viễn"
                }
            }).then((value) => {
                switch (value) {
                    case "buy1":
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
                        break;
                    case "buy2":
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
                        break;
                    default:
                }
            })
        }
    })

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
            <form className='vip-popup' onSubmit={formik.handleSubmit}>
                <div className='popup-title'>
                    ⭐ Mua VIP ⭐
                </div>
                <div className='popup-content'>
                    <div className='input-container'>
                        <label htmlFor='bankName'>Tên ngân hàng: </label>
                        <input
                            type="text"
                            id='bankName'
                            name='bankName'
                            value={formik.values.bankName}
                            onChange={formik.handleChange}
                            placeholder='VD: Vietcombank'
                        />
                        <p>{formik.errors.bankName && "Yêu cầu nhập tên ngân hàng!"}</p>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='accountNumber'>Số tài khoản: </label>
                        <input
                            type="text"
                            id='accountNumber'
                            name='accountNumber'
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            placeholder='VD: 1234 567 899'
                        />
                        <p>{formik.errors.accountNumber && "Yêu cầu nhập số tài khoản ngân hàng!"}</p>
                    </div>
                    <div className='text-prices'>
                        <p><strong>VIP 1:</strong> 300.000 VND</p>
                        <p><strong>VIP VĨNH VIỄN:</strong> 300.000 VND</p>
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
                        type="submit"
                    >
                        Mua VIP
                    </button>
                </div>
            </form>
        </div>
    )
}

export default VipContainer