import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDish, userVoted } from "../Api/dish.api";
import "./dish.scss";
import DishOption from "./DishOption/DishOption";
import DishVote from "./DishVote/DishVote";
import Parser from "html-react-parser";
export default function Dish() {
  const dispatch = useDispatch();
  const dishData = useSelector((state) => state.dish.dataDish.data);
  const [voted, setVoted] = useState(0);
  const param = useParams();
  const [option, setOption] = useState(1);

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
  return (
    <div className="dish">
      <div className="dish-title">
        <h2>{dishData?.data[0]?.name}</h2>
      </div>
      <Container className="dish-container">
        <Row className="dish-container-row-1">
          <Col className="dish-container-row-1-img" md={5}>
            <img
              className="dis-container-row-1-img-main"
              src={
                dishData?.data[0]?.image ||
                "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-12.jpg"
              }
              alt=""
            />
          </Col>
          <Col
            className="dish-container-row-1-ingredient"
            md={{ span: 5, offset: 1 }}
          >
            <h4>Ingredient</h4>
            <ul>
              {dishData?.data[1]?.map((_s, index) => {
                return (
                  <li>{`${index + 1} . ${_s?.raw_material_name} :${
                    _s?.recipe_raw_material_amount
                  } ${_s?.raw_material_unit}`}</li>
                );
              })}
            </ul>
          </Col>
        </Row>
        <Row className="dish-container-row-2">
          <Col className="dish-container-row-2-option" md={3}>
            <DishOption setOption={setOption} />
          </Col>
          <Col
            className="dish-container-row-2-description"
            md={{ span: 7, offset: 1 }}
          >
            {option === 0 && dishData && (
              <div className="dish-container-row-2-description-0">
                <h3>Description</h3>
                {Parser(dishData?.data[0]?.description)}
              </div>
            )}
            {option === 1 && dishData && (
              <div className="dish-container-row-2-description-1">
                <h3>Processing instruction</h3>
                {Parser(dishData?.data[0]?.formula)}
              </div>
            )}
            {option === 2 && dishData && (
              <div className="dish-container-row-2-description-2">
                <h3>Storage instruction</h3>
                {"Bao quan ban tu lanh"}
              </div>
            )}
          </Col>
        </Row>
        <Row className="dish-container-row-3">
          <Col className="dish-container-row-3-voted" md={5}>
            <h2> {`Average rating: ${voted}`}</h2>
          </Col>
          <Col
            className="dish-container-row-3-voting"
            md={{ span: 5, offset: 1 }}
          >
            <DishVote />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
