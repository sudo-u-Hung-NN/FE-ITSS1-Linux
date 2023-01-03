import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllCommentById } from '../../Api/comment.api';
import { getUsersForShowComment } from '../../Api/user.api';
import { useState } from 'react';

const Comment = ({ listComments }) => {

    const currentUser = useSelector(state => state.auth.login.currentUser);
    const [userComment, setUserComment] = useState();
    const [comments, setComments] = useState([]);

    console.log(listComments);

    // console.log(currentUser);
    const getComments = () => {
        listComments.map((comment) => {
            getUsersForShowComment(comment.user_id)
                .then((res) => {
                    const user = {
                        username: res.data.username,
                        avatar: res.data.avatar,
                        comment: comment.content,
                        comment_date: comment.date_comment
                    }
                    // setUserComment(user);
                    const list = [...comments, user];
                    setComments(list)
                })
                .catch((err) => {
                    // console.log(err)
                })
        })
    }

    // getComments();

    useEffect(() => {
        getComments()
    }, [1])

    console.log(comments)


    return (
        <div className='comment-session'>
            <div className='post-comment'>
                {comments?.map((comment, index) => (
                    <div className='list' key={index}>
                        <div className='user'>
                            <div className='user-image'>
                                <img src={comment.avatar} alt='' />
                            </div>
                            <div className='user-meta'>
                                <div className='username'>Aresky</div>
                                <div className='day'>10 days ago</div>
                            </div>
                        </div>
                        <div className='content'>
                            Cái món này ăn dở tệ, thực sự ban đầu nhìn cứ tưởng ngon lắm, nhưng sau đó phát hiện dở tệ...
                        </div>
                    </div>
                ))}
            </div>
            <div className='comment-box'>
                <div className='user'>
                    <div className='image'>
                        <img src={currentUser.avatar} alt='' />
                    </div>
                    <div className='username'>Aresky</div>
                </div>
                <form>
                    <textarea name='comment' id='comment' cols="30" rows="10" placeholder='Bình luận của bạn...'>
                    </textarea>
                    <button type='submit' className='comment-submit'>Bình Luận</button>
                </form>
            </div>
        </div>
    )
}

export default Comment