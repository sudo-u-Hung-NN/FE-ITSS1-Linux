import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDish, userVoted } from "../Api/dish.api";
import "./dish.scss";
import DishOption from "./DishOption/DishOption";
import DishVote from "./DishVote/DishVote";
import Parser from "html-react-parser";
import { Description } from "./DishOption/Description";
import { Formula } from "./DishOption/Formula";
import { Note } from "./DishOption/Note";
import VideoTutorial from "./DishOption/VideoTutorial";
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

  console.log(dishData);
  return (
    <div className="dish">
      <div className="dish-title">
        <h2>{dishData?.data[0]?.name}</h2>
      </div>
      <Container className="dish-container">
        <Row className="row-1">
          <Col className="img" md={5}>
            <img
              className="img-main"
              src={
                dishData?.data[0]?.image ||
                "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-12.jpg"
              }
              alt=""
            />
          </Col>
          <Col className="ingredient" md={{ span: 5, offset: 1 }}>
            <h4>Công thức</h4>
            <table className="ingredient-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nguyên liệu</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                </tr>
              </thead>
              <tbody>
                {dishData?.data[1].map((ing, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ing.raw_material_name}</td>
                    <td>{ing.recipe_raw_material_amount}</td>
                    <td>{ing.raw_material_unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="row-2">
          <div className="option" md={3}>
            <DishOption setOption={setOption} />
          </div>
          <div className="description" md={{ span: 7, offset: 1 }}>
            {option === 0 && dishData && <Description dishData={dishData} />}
            {option === 1 && dishData && <Formula dishData={dishData} />}
            {option === 2 && dishData && <Note dishData={dishData} />}
            {option === 3 && dishData && <VideoTutorial />}
          </div>
        </Row>
        <Row className="row-3">
          <Col className="dish-container-row-3-voted" md={5}>
            <h2> {`Bình chọn trung bình: ${voted}`}</h2>
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
