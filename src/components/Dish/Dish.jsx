import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDish, userVoted } from "../Api/dish.api";
import "./dish.scss";
import DishOption from "./DishOption/DishOption";
import DishVote from "./DishVote/DishVote";
import { Description } from "./DishOption/Description";
import { Formula } from "./DishOption/Formula";
import { Note } from "./DishOption/Note";
import VideoTutorial from "./DishOption/VideoTutorial";
import CommentRecipe from "../OtherComponent/Comment/Comment";
import { getAllCommentById } from "../Api/comment.api";
import ChatPopup from "../OtherComponent/Chat/ChatPopup";
import ChatPopupForCreator from "../OtherComponent/Chat/ChatPopupForCreator";
import { getUsersForChat } from "../Api/user.api";
import { getListSenderId } from "../Api/chat.api";
import { BsMessenger } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';


export default function Dish() {
  const dispatch = useDispatch();
  const dishData = useSelector((state) => state.dish.dataDish.data);
  const creatorId = dishData?.data[0].creator;
  const [creator, setCreator] = useState();
  const [voted, setVoted] = useState(0);
  const param = useParams();
  const [option, setOption] = useState(1);
  const [listComments, setListComments] = useState([]);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [showPopupListSender, setshowPopupListSender] = useState(false);
  const [showPopupChat, setShowPopupChat] = useState(false);

  const initialSenders = [
    { id: 1, username: 'username1' },
    { id: 2, username: 'username2' },
    { id: 3, username: 'username3' },
    { id: 4, username: 'username4' },
    { id: 5, username: 'username5' },
    { id: 6, username: 'username6' },
    { id: 7, username: 'username7' },
  ]

  const [sender, setSender] = useState();
  const [senders, setSenders] = useState([]);

  const getCreatorById = () => {
    getUsersForChat(creatorId)
      .then((res) => {
        setCreator(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // console.log(dishData?.data)

  useEffect(() => {
    getCreatorById()
  }, [dishData]);

  useEffect(() => {
    getDish(param.id, dispatch);
  }, [param, dispatch]);

  useEffect(() => {
    userVoted(param.id).then((res) => {
      if (res.data.avg !== null) {
        setVoted(res.data.avg);
      } else setVoted(0);
    });
  }, [voted, setVoted]);

  useEffect(() => {
    getAllCommentById(dishData?.data[0].id)
      .then((res) => {
        setListComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dishData]);

  useEffect(() => {
    getListSenderId(dishData?.data[0].id)
      .then(
        res => {
          setSenders(res.data);
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  }, [dishData])

  return (
    <div className="dish">
      <div className="dish-title">
        <h2>{dishData?.data[0]?.name}</h2>
      </div>
      <Container className="dish-container">
        <Row className="row-1">
          <Col className="img" md={5}>
            <img
              className="img-main"
              src={
                dishData?.data[0]?.image ||
                "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-12.jpg"
              }
              alt=""
            />
          </Col>
          <Col className="ingredient" md={{ span: 5, offset: 1 }}>
            <h4>Công thức</h4>
            <table className="ingredient-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nguyên liệu</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                </tr>
              </thead>
              <tbody>
                {dishData?.data[1].map((ing, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ing.raw_material_name}</td>
                    <td>{ing.recipe_raw_material_amount}</td>
                    <td>{ing.raw_material_unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="taste-table">
              <b>Hương vị: </b>
              {/* {
              dishData?.data[2].map((taste, index) => <i key={index} style={{color:"red"}}>* {taste.taste_name} </i>)
              } */}
              {dishData?.data[2].map((taste, i) => {
                if (i === dishData.data[2].length - 1) {
                  return <i>{taste.taste_name}.</i>;
                }
                return <i>{taste.taste_name}, </i>;
              })}
              {/* <tr className="taste-row">
                <td>Hương vị</td>
                {dishData?.data[2].map((taste, index) => <td key={index} style={{color:"red"}}>{taste.taste_name}</td>)}
              </tr> */}
            </table>
          </Col>
        </Row>
        <Row className="row-2">
          <div className="option" md={3}>
            <DishOption setOption={setOption} />
          </div>
          <div className="description" md={{ span: 7, offset: 1 }}>
            {option === 0 && dishData && <Description dishData={dishData} />}
            {option === 1 && dishData && <Formula dishData={dishData} />}
            {option === 2 && dishData && <Note dishData={dishData} />}
            {option === 3 && dishData && <VideoTutorial dishData={dishData} />}
          </div>
        </Row>
        <Row className="row-3">
          <Col className="dish-container-row-3-voted" md={5}>
            <h2> {`Bình chọn trung bình: ${voted}`}</h2>
          </Col>
          <Col
            className="dish-container-row-3-voting"
            md={{ span: 5, offset: 1 }}
          >
            <DishVote />
          </Col>
        </Row>
      </Container>
      <CommentRecipe listComments={listComments} recipe_id={param.id} />
      {currentUser?.id !== creatorId ?
        <ChatPopup creator={creator} sender_id={currentUser?.id} reciver_id={creatorId} recipe_id={dishData?.data[0].id} />
        :
        <>
          {
            !showPopupListSender &&
            <div className="chatbox-toggle"
              onClick={() => setshowPopupListSender(!showPopupListSender)}
            >
              {/* <i className='bx bx-message-dots'></i> */}
              <BsMessenger />
            </div>
          }
          {showPopupListSender &&
            <div className="chatbox-list-senders">
              <div className="chatbox-list-senders-title">
                Chat
                <div className="ai-outline-close-icon"
                  onClick={() => setshowPopupListSender(false)}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className="chatbox-list-senders-body">
                {senders.map((sender) => (
                  <div className="chatbox-list-senders-item"
                    key={sender.id}
                    onClick={() => {
                      setSender(sender);
                      setShowPopupChat(true)
                      setshowPopupListSender(false);
                    }}
                  >
                    <div className="avatar">
                      <img src={sender.avatar ? sender.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                    </div>
                    <div className="username">
                      {sender.username}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          {sender && <ChatPopupForCreator
            creator={creator}
            sender={sender}
            recipe_id={dishData?.data[0].id}
            showPopupChat={showPopupChat}
            setShowPopupChat={setShowPopupChat}
          />
          }
        </>
      }
    </div>
  );
}
