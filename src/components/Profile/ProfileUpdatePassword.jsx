import {useFormik} from 'formik'
import React from 'react'
import {updatePassword} from "../Api/user.api";
import {validatePasswordForUpdate} from "../Api/auth.api";
import {useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const ProfileUpdatePassword = ({setUpdatePassword}) => {
    const yup = require('yup');
    const errorMessage = useSelector((state) => state.auth.login.currentUserError);
    const user = useSelector((state) => state.user.dataUser.data);

    const validationPassword = yup.object({
        currentPassword: yup.string().required("Mật khẩu không được để trống"),
        newPassword: yup.string().min(8, 'Mật khẩu phải dài hơn 8 ký tự').required("Mật khẩu không được để trống"),
        confirmPassword: yup.string().required("Mật khẩu không được để trống").oneOf([yup.ref("newPassword"), null], "Mật khẩu không trùng"),
    })

    const formik = useFormik({
        initialValues: {
            id: user.id,
            email: user.email,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            errorMessage: ""
        },
        validationSchema: validationPassword,
        onSubmit: values => {
            validatePasswordForUpdate({
                email: values.email,
                password: values.currentPassword
            }).then(() => {
                console.log('validate pass successfully')
                updatePassword(values.id, values.newPassword, setUpdatePassword, toast)
                console.log("Current password is valid");
            })
            .catch(err => {
                toast('❌ Mật khẩu hiện tại không chính xác');
            })
            .finally(() => {
            console.log('Đặt lại mật khẩu thành công!');
            })
        }
    });

    return (
        <>
            <div className='content'>
                <div className='details'>
                    <h2>Đặt lại mật khẩu</h2>
                    <span>
            Mật khẩu hiện tại:
            <input
                type="password"
                id='currentPassword'
                name='currentPassword'
                placeholder='Current password'
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
            />
          </span>
                    {formik.errors.currentPassword &&
                        <p className='err'>{formik.errors.currentPassword}</p>
                    }
                    <span>
            Mật khẩu mới:
            <input
                type="password"
                id='newPassword'
                name='newPassword'
                placeholder='New password'
                value={formik.values.newPassword}
                onChange={formik.handleChange}
            />
          </span>
                    {formik.errors.newPassword &&
                        <p className='err'>{formik.errors.newPassword}</p>
                    }
                    <span>
            Nhập lại mật khẩu mới:
            <input
                type="password"
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm password'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
            />
          </span>
                    {formik.errors.confirmPassword &&
                        <p className='err'>{formik.errors.confirmPassword}</p>
                    }
                </div>
            </div>

            {
                errorMessage &&
                <div className="err">
                    <p>{errorMessage}</p>
                </div>
            }
            <div className='button'>

                <button type='submit' onClick={formik.handleSubmit}>
                    Cập nhật
                </button>

                <button type='button' onClick={() => setUpdatePassword(false)}>
                    Huỷ
                </button>
            </div>
            <ToastContainer/>
        </>
    )
}

export default ProfileUpdatePassword