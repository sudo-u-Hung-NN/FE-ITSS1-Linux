import React, { useState, useEffect } from "react";
import "../../CSS/search.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { convertMatrix } from "../Utils/utils";
import ro from "date-fns/esm/locale/ro/index.js";
import { searchApi } from "../Api/search.api";

function Search(props) {
  // const [query, setQuery] = useState("");
  const [moreClicked, setMore] = useState(false);
  const [checkedList, setCheckedList] = useState({});
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowIngredient, setRowIngredient] = useState([]);

  const onClickToSearch = async (name) => {
    console.log(name);
    const api = await searchApi(name);
    setSearchedRecipes(api.data);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/recipe/getMaterial").then((res) => {
      setRowIngredient(convertMatrix(res.data, 5));
    });
  }, []);
  const handlecheck = (isCheck, id) => {
    const checkedListClone = { ...checkedList };
    checkedListClone[id] = isCheck;
    setCheckedList(checkedListClone);
    // convert end call api here
    const filter_item_ids = Object.keys(checkedListClone).filter(
      (key) => checkedListClone[key] === true
    );
    console.log(filter_item_ids); // ['1', '2', '3', '4']
    // Receive and setSearchedRecipes here
    const converted_request = filter_item_ids.join("+");
    console.log(converted_request);

    // TODO: Tùng xử lý ghép API ở đây, data truyền vào là converted_request
  };

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="form-check">
        <p>Ingredient</p>

        <div className="ingredient-option">
          {(moreClicked ? rowIngredient : rowIngredient.slice(0, 2))?.map(
            (item) => (
              <div key={item.id}>
                {item?.map((ingredent) => (
                  <label key={ingredent.id} className="container-checkbox">
                    {ingredent.name}
                    <input
                      type="checkbox"
                      onChange={(event) =>
                        handlecheck(event.currentTarget.checked, ingredent.id)
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </div>
            )
          )}
        </div>
        <div>
          {moreClicked ? (
            <span className="hide" onClick={() => setMore(false)}>
              Hide
            </span>
          ) : (
            <span className="more" onClick={() => setMore(true)}>
              More...
            </span>
          )}
        </div>
      </div>
      <div className="btn-search">
        <button
          className="button-4"
          onClick={() => onClickToSearch(searchTerm)}
        >
          Search
        </button>
        <button className="button-4">Clear</button>
      </div>
      <div className="recipes-card">
        <Grid>
          {searchedRecipes?.map(({ title, id, image }) => (
            <Card key={id}>
              <Link to={`/dish/${id}`}>
                <img src={image} alt={title} />
                <h5>{title}</h5>
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
