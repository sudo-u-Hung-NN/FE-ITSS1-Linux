import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessageAuth from "../../ErrorMessage/ErrorMessageAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPassword } from "../../../Api/auth.api";
import { Button, Modal } from "react-bootstrap";

export default function FormRegister() {
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const { registerMessageError } = useSelector((state) => state.auth.register);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleClass = (name, baseClass = "form-control") =>
        `${baseClass} ${errors[name] ? "is-invalid" : ""}`;
    const handleClick = (data) => {
        const fixData = { ...data, qid: Number(data.qid) };
        try {
            getPassword(fixData, setPassword).then((res) => {
                setShow(true);
                if (res.data == "Câu trả lời không đúng") {
                    setPassword(res.data);
                } else setPassword(`Mật khẩu của bạn là: ${res.data}`);
            });
        } catch (err) {
            setPassword(err);
        }
        // TODO: process this with some API
        // 1. Check the correct question
        // 2. Check the correct answer
        // If the logic is true, then display an alert (showing the old password)
    };

    const mockup_questions = [
        { id: 1, content: "Gia đình bạn có bao nhiêu người ?" },
        { id: 2, content: "Bạn sống ở đâu lúc 6 tuổi ?" },
        { id: 3, content: "Tên trường tiểu học của bạn là gì ?" },
    ];

    // FE - done, BE - None

    return (
        <form className="form" onSubmit={handleSubmit(handleClick)}>
            <h3>Lấy lại mật khẩu</h3>
            <div className="mb-3">
                <label>Email</label>
                <input
                    {...register("email", {
                        required: { value: true, message: "Bạn phải điền email" },
                        maxLength: { value: 99, message: "email phải ngắn hơn 99 ký tự" },
                        minLength: { value: 10, message: "email phải dài hơn 10 ký tự" },
                        validate: {
                            email: (v) =>
                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
                                "email không hợp lệ",
                        },
                    })}
                    type="email"
                    className={handleClass("email")}
                    placeholder="Enter email"
                />
                <ErrorMessageAuth name="email" errors={errors} />
            </div>

            <div className="mb-3">
                <label>Câu hỏi bí mật</label>
                <select {...register("qid")} className={handleClass("qid")}>
                    <option value={0} disabled selected hidden>
                        Chọn câu hỏi
                    </option>
                    {mockup_questions?.map((item, index) => (
                        <option value={index + 1}>{item["content"]}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label>Trả lời</label>
                <input
                    {...register("answer", {
                        required: { value: true, message: "Bạn phải trả lời câu hỏi" },
                        minLength: {
                            value: 0,
                            message: "Câu trả lời phải nhiều hơn 0 ký tự",
                        },
                        maxLength: {
                            value: 99,
                            message: "Câu trả lời phải ít hơn 99 ký tự",
                        },
                    })}
                    type="text"
                    className={handleClass("answer")}
                    placeholder="Nhập câu trả lời"
                />
                <ErrorMessageAuth name="answer" errors={errors} />
            </div>

            {registerMessageError && (
                <div className="text-danger">{registerMessageError}</div>
            )}
            <div className="d-grid">
                <Button variant="primary" type="submit">
                    Hoàn tất
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{password}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Trở lại trang đăng nhập
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </form>
    );
}
