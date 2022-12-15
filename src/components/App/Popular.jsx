import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { getPopular } from "../Api/dish.api";
import { getRandomArrayNumber } from "../Utils/utils";
function Popular(props) {
  const [popular, setPopular] = useState([]);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    getPopular(setPopular);
  }, [getPopular, setPopular]);
  useEffect(() => {
    const a = getRandomArrayNumber(popular.length, 6);
    setArr(a);
  }, [setArr, popular]);
  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 5,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "4rem",
          }}
        >
          {arr[0] &&
            arr.map((recipeId) => {
              return (
                <SplideSlide key={recipeId}>
                  <Link to={`dish/${recipeId}`}>
                    <Card>
                      <p>{popular[recipeId]?.name}</p>
                      <img
                        src={popular[recipeId]?.image}
                        alt={popular[recipeId]?.name}
                      />
                      <Gradient />
                    </Card>
                  </Link>
                </SplideSlide>
              );
            })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 2rem;

  h3 {
    margin-bottom: 50px;
  }
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
