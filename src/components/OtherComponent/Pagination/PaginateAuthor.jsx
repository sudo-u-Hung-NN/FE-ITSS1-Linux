import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const PaginateAuthor = ({ otherRecipes }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 4;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(otherRecipes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(otherRecipes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, otherRecipes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % otherRecipes.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className='other-recipes'>
                {currentItems.map((recipe, index) => {
                    return (
                        <Link
                            to={`/dish/${recipe.id}`}
                            key={index}
                            className='recipe-item'
                        >
                            <div className='image'>
                                <img src={recipe.image} alt={recipe.name} />
                            </div>
                            <div className='details'>
                                <p>Công thức: {recipe.name}</p>
                                <p>Người tạo: {recipe.creator}</p>
                            </div>
                            <div className='gradient'></div>
                        </Link>
                    )
                })}
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
        </>
    )
}

export default PaginateAuthor