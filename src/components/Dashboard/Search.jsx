import React, { useState, useEffect } from 'react';
import '../../CSS/search.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllIngredients } from "../Api/ingredient.api";
import { getAllRecipes, getRecipesForFilter, getRecipesForSearchByName } from "../Api/recipe.api";
import { FiSearch } from 'react-icons/fi';
import { BiFilterAlt } from 'react-icons/bi';
import { getAllNations } from '../Api/nation.api';
import { getAllTastesApi } from '../Api/taste.api';

function Search(props) {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [listIngredient, setListIngredient] = useState([]);
    const [nations, setNations] = useState([]);
    const [allTastes, setAllTastes] = useState([]);

    const getSearchedRecipes = (search) => {
        getRecipesForSearchByName(search).then(
            res => {
                setSearchedRecipes(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    const handleChangeSearch = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    }

    const mockup_ingredents = [...listIngredient]

    const convertMatrix = (one_dimensional_array, n) => {
        while (one_dimensional_array.length) {
            return [...one_dimensional_array.splice(0, n)]
        }
    }

    const mockup_converted = convertMatrix(mockup_ingredents, 20);
    const show_up_ingredents = mockup_converted?.slice(0, 2);
    const hidden_ingredents = mockup_converted?.slice(0, 20);
    const [moreClicked, setMore] = useState(false)
    const [checkedList, setCheckedList] = useState({});

    const handleCheck = (isCheck, id) => {
        const checkedListClone = { ...checkedList }
        checkedListClone[id] = isCheck
        setCheckedList(checkedListClone)
        // convert end call api here
        const filter_item_ids = Object.keys(checkedListClone).filter(key => checkedListClone[key] === true)
        const converted_request = filter_item_ids.join("+");
        console.log('List ingredients: ', converted_request);
        // Receive and setSearchedRecipes here
        if (converted_request.length > 0) {
            getRecipesForFilter(converted_request).then(
                res => {
                    console.log(res.data);
                    setSearchedRecipes(res.data);
                }
            ).catch(err => {
                console.log(err);
            });
        } else {
            setSearchedRecipes([]);
        }
    }


    useEffect(() => {
        getAllIngredients().then(res => {
            setListIngredient(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        getSearchedRecipes(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        if (searchTerm === "" || listIngredient === null) {
            getAllRecipes().then(
                res => {
                    setSearchedRecipes(res.data)
                }
            )
        }
    }, [searchTerm, listIngredient]);

    useEffect(() => {
        getAllNations()
            .then((res) => {
                console.log('nations', res.data)
                setNations(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        getAllTastesApi()
            .then((res) => {
                console.log('tastes', res.data)
                setAllTastes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="search-container">
            <div className='search-filter-container'>
                <div className='search-icon'>
                    <input type="text" placeholder="Search..." className="search" onChange={(e) => handleChangeSearch(e)} />
                    <FiSearch id='search-svg-icon' />
                </div>
                <div className="form-select">
                    <div id='filter-icon'>
                        <BiFilterAlt size={34} />
                    </div>
                    <div>
                        <select className="orderBy" id="orderBy-select">
                            <option>--Sắp xếp theo:--</option>
                            <option value="name">Tên</option>
                            <option value="price">Giá</option>
                            <option value="vote">Bình chọn</option>
                            <option value="view">Lượt xem</option>
                        </select>
                    </div>
                    <div>
                        <select className="price" id="price-select">
                            <option>--Giá tiền--</option>
                            <option value="">0 - $1.99</option>
                            <option value="">$2 - $5</option>
                            <option value="">$5 - $10</option>
                        </select>
                    </div>
                    <div>
                        <select className='country' id='country'>
                            <option value="">--Quốc gia--</option>
                            {nations.map((nation, index) => {
                                return (
                                    <option key={index} value={nation.name}>
                                        {nation.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <select className='taste' id='taste' onChange={(e) => { console.log('Huong vi: ', e.target.value) }}>
                            <option value="">--Hương vị--</option>
                            {allTastes.map((taste, index) => {
                                return (
                                    <option key={index} value={taste.id}>
                                        {taste.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-check">
                <p>Nguyên liệu</p>
                <div className="check-list-item">
                    {
                        (moreClicked ? hidden_ingredents : show_up_ingredents)?.map(item => (
                            <div key={item.id} className="check-item">
                                {/*{item?.map((ingredient) => (*/}
                                <label key={item.id} className="container-checkbox">
                                    <span>{item.name}</span>
                                    <input type="checkbox"
                                        onChange={(event) => handleCheck(event.currentTarget.checked, item.id)} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        ))
                    }
                </div>
                {
                    moreClicked ?
                        <span className="more" onClick={() => setMore(false)}>Ẩn...</span>
                        :
                        <span className="more" onClick={() => setMore(true)}>Thêm...</span>
                }
            </div>
            <div className="recipes-card">
                <Grid>
                    {searchedRecipes?.map(({ id, name, image }) => (
                        <Card key={id}>
                            <Link to={`/dish/${id}`}>
                                <img src={image} alt={name} />
                                <h5>{name}</h5>
                            </Link>
                        </Card>
                    ))}
                </Grid>
            </div>

        </div>
    );
}

const Grid = styled.div`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            text-align: center;
            gap: 2rem;
            `;

const Card = styled.div`
            img {
                width: min(320px, 100%);
            border-radius: 2rem;
  }

            a {
                text - decoration: none;
  }

            h5 {
                text - align: center;
            padding: 1rem;
            color: #ec875b;

  }
            `;

export default Search;