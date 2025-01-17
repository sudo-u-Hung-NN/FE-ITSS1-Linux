import React, {useEffect, useState} from 'react';
import {getRecipesForCurrentUser, getRecipesForOtherUser} from '../Api/recipe.api';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {Link} from "react-router-dom";
import '../../CSS/author.scss';
import PaginateAuthor from '../OtherComponent/Pagination/PaginateAuthor';
import {AiFillWarning} from "react-icons/ai";

function Author(props) {

    const [recipes, setRecipes] = useState([]);
    const [otherRecipes, setOtherRecipes] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('currentUserLoggedIn'));

    useEffect(() => {
        getRecipesForCurrentUser(userInfo?.id)
            .then((res) => {
                console.log('current: ', res.data);
                setRecipes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        getRecipesForOtherUser(userInfo?.id)
            .then((res) => {
                console.log('other: ', res.data);
                setOtherRecipes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            {
                userInfo ?
                    <div className='div-author-container'>
                        <div className='div-item your-recipes'>
                            <h3>Món ăn của bạn</h3>
                            <Splide
                                options={{
                                    perPage: 4,
                                    // arrows: false,
                                    // pagination: false,
                                    // drag: "free",
                                    gap: "4rem",
                                    type: "loop"
                                }}
                            >
                                {recipes && recipes.map((recipe) => {
                                    return (
                                        <SplideSlide key={recipe.id}>
                                            <Link to={`/dish/${recipe.id}`}>
                                                <div className='card'>
                                                    <p>{recipe.name}</p>
                                                    <img src={recipe.image} alt={recipe.name}/>
                                                    <div className='gradient'></div>
                                                </div>
                                            </Link>
                                        </SplideSlide>
                                    );
                                })}
                            </Splide>
                        </div>
                        <div className='div-item people-recipes'>
                            <h3>Cộng đồng chia sẻ</h3>
                            <PaginateAuthor otherRecipes={otherRecipes}/>
                        </div>
                    </div>
                    :
                    <div className='login-after'>
                        <AiFillWarning fontSize={"120px"} color="#FD6929"/>
                        <p>Bạn phải
                            <i><Link to='/login'> đăng nhập </Link></i>
                            để xem công thức cá nhân
                        </p>
                    </div>
            }
        </>
    );
}

export default Author;