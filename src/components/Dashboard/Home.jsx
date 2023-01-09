import React, { useEffect, useState } from 'react';
import { getAllRecipes } from "../Api/recipe.api.js"
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';
function Home(props) {

    const [listRecipes, setListRecipes] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 16;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listRecipes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listRecipes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listRecipes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listRecipes.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        getAllRecipes().then(
            res => {
                // console.log('res: ', res.data);
                setListRecipes(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }, [])

    // console.log("list", listRecipes);

    return (
        <div className='home-page-container'>
            <div className='header'>
                <h2>🧑‍🍳 Công thức nấu ăn 🍽️</h2>
                Learn more than <b>1000 delicious recipes</b> and discover delicious regional dishes with detailed recipes!
            </div>
            <div className='body'>
                {currentItems.map((recipe, index) => (
                    <div
                        key={index}
                        className='recipe-item'
                    >
                        <div className='image'>
                            <img src={recipe.image} alt='' />
                        </div>
                        <Link className='gradient' to={`/dish/${recipe.id}`}></Link>
                        <p>{recipe.name}</p>
                        <Link to={`/dish/${recipe.id}`} className='learn-more'>Chi tiết</Link>
                    </div>
                ))}
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeClassName='active'
            />
        </div>
    );
}

export default Home;