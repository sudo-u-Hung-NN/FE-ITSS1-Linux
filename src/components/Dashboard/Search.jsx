import React, { useState, useEffect } from "react";
import "../../CSS/search.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllIngredients } from "../Api/ingredient.api";
import {
  getRecipesForFilter,
  getRecipesForSearchByName,
} from "../Api/recipe.api";

function Search(props) {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listIngredient, setListIngredient] = useState([]);

  const getSearchedRecipes = (search) => {
    getRecipesForSearchByName(search)
      .then((res) => {
        setSearchedRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(searchedRecipes);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const onClickToSearch = () => {
    getSearchedRecipes(searchTerm);
  };

  // useEffect(() => {
  //     getSearchedRecipes(searchTerm);
  //     console.log('search: ', searchTerm)
  // }, []);

  const mockup_ingredents = [...listIngredient];

  const convertMatrix = (one_dimensional_array, n) => {
    while (one_dimensional_array.length) {
      return [...one_dimensional_array.splice(0, n)];
    }
  };

  const mockup_converted = convertMatrix(mockup_ingredents, 20);
  const show_up_ingredents = mockup_converted?.slice(0, 2);
  const hidden_ingredents = mockup_converted?.slice(0, 20);
  const [moreClicked, setMore] = useState(false);
  const [checkedList, setCheckedList] = useState({});

  const handleCheck = (isCheck, id) => {
    const checkedListClone = { ...checkedList };
    checkedListClone[id] = isCheck;
    setCheckedList(checkedListClone);
    // convert end call api here
    const filter_item_ids = Object.keys(checkedListClone).filter(
      (key) => checkedListClone[key] === true
    );
    const converted_request = filter_item_ids.join("+");
    // Receive and setSearchedRecipes here
    getRecipesForFilter(converted_request)
      .then((res) => {
        console.log(res.data);
        setSearchedRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllIngredients()
      .then((res) => {
        setListIngredient(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="search-container">
      <div className="form-select">
        <label htmlFor="order-select">Order by:</label>
        <select className="orderBy" id="orderBy-select">
          <option value="none">--None--</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="vote">Vote</option>
          <option value="view">View</option>
        </select>
        <label htmlFor="price-select">Price:</label>
        <select className="price" id="price-select">
          <option value="default">--Default--</option>
          <option value="">0 - $1.99</option>
          <option value="">$2 - $5</option>
          <option value="">$5 - $10</option>
        </select>
        <label htmlFor="pet-select">Search:</label>
        {/* <FaSearch /> */}
        <input
          type="text"
          placeholder="Search.."
          className="search"
          onChange={(e) => handleChangeSearch(e)}
        />
      </div>
      <div className="form-check">
        <p>Ingredient</p>
        <div className="check-list-item">
          {(moreClicked ? hidden_ingredents : show_up_ingredents)?.map(
            (item) => (
              <div key={item.id} className="check-item">
                {/*{item?.map((ingredient) => (*/}
                <label key={item.id} className="container-checkbox">
                  <span>{item.name}</span>
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      handleCheck(event.currentTarget.checked, item.id)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            )
          )}
        </div>
        {moreClicked ? (
          <span className="more" onClick={() => setMore(false)}>
            Hidden...
          </span>
        ) : (
          <span className="more" onClick={() => setMore(true)}>
            More...
          </span>
        )}
      </div>
      <div className="btn-search">
        <button className="button-4" onClick={onClickToSearch}>
          Search
        </button>
        <button className="button-4">Clear</button>
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
    text-decoration: none;
  }

  h5 {
    text-align: center;
    padding: 1rem;
    color: #ec875b;
  }
`;

export default Search;
