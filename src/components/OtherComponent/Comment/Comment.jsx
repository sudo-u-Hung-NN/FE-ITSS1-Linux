import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCommentById,
  createCommentApi,
  updateCommentApi,
} from "../../Api/comment.api";
import { getUsersForShowComment } from "../../Api/user.api";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { setShowTrue } from "../../../Redux/isShow.slice";

const Comment = ({ listComments, recipe_id }) => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const isShow = useSelector((state) => state.isShow.show);
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState();
  const [comments, setComments] = useState([]);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const time = new Date();
    // const timeNow = `${time.getFullYear()}-${
    //   time.getMonth() + 1
    // }-0${time.getDate()}`;
    const timeNow = new Date();
    console.log(timeNow);
    const formComment = {
      recipe_id,
      user_id: currentUser.id,
      content: userComment,
      date_comment: timeNow,
    };
    comments?.find((item) => item.user_id === currentUser.id)
      ? updateCommentApi({ ...formComment })
          .then(() => {
            toast.success("Cảm ơn về bình luận của bạn !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUserComment("");
          })
          .then(() => {
            getAllCommentById(recipe_id)
              .then((res) => {
                setComments(res.data);
              })
              .catch((err) => console.log(err));
          })
          .catch(() => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!!!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          })
      : createCommentApi({ ...formComment })
          .then(() => {
            toast.success("Cảm ơn về bình luận của bạn !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUserComment("");
          })
          .then(() => {
            getAllCommentById(recipe_id).then((res) => {
              setComments(res.data);
            });
          })
          .catch(() => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!!!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
  };
  const handleClickButton = () => {
    dispatch(setShowTrue());
  };
  useEffect(() => {
    setComments(listComments);
  }, [listComments, setComments]);
  // console.log(currentUser);
  //   const getComments = () => {
  //     listComments.map((comment) => {
  //       getUsersForShowComment(comment.user_id)
  //         .then((res) => {
  //           const user = {
  //             username: res.data.username,
  //             avatar: res.data.avatar,
  //             comment: comment.content,
  //             comment_date: comment.date_comment,
  //           };
  //           // setUserComment(user);
  //           const list = [...comments, user];
  //           setComments(list);
  //         })
  //         .catch((err) => {
  //           // console.log(err)
  //         });
  //     });
  //   };

  // getComments();
  return (
    <div className="comment-session">
        <h4>BÌNH LUẬN</h4>
      <div className="post-comment">
        {comments?.map((comment, index) => (
          <div className="list" key={index}>
            <div className="user">
              <div className="user-image">
                <img
                  src={
                    comment.user_avatar
                      ? `${comment.user_avatar}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
              </div>
              <div className="user-meta">
                <div className="username">{comment.user_username}</div>
                <div className="day">
                  {comment.comment_date_comment.slice(
                    0,
                    comment.comment_date_comment.indexOf("T")
                  )}
                </div>
              </div>
            </div>
            <div className="content">{comment.comment_content}</div>
          </div>
        ))}
      </div>
      {currentUser ? (
        <div className="comment-box">
          <div className="user">
            <div className="image">
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
              />
            </div>
            <div className="username">{currentUser.username}</div>
          </div>
          <form onSubmit={handleSubmitComment}>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              placeholder="Bình luận của bạn..."
              value={userComment}
              onChange={(e) => {
                setUserComment(e.target.value);
              }}
            ></textarea>
            <button type="submit" className="comment-submit">
              Bình Luận
            </button>
          </form>
        </div>
      ) : (
        <Button
          className="vote-button"
          variant="primary"
          onClick={handleClickButton}
        >
          Đăng nhập để bình luận
        </Button>
      )}
    </div>
  );
};

export default Comment;
