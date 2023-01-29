import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import { limitForPage } from "../../../../utils/limitForPage";
import { AdminPagination } from "./pagination";
import { Container, Row, Col } from "react-bootstrap";
export default function AdminTable() {
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUser] = useState([
    { id: 0, name: "tung", status: 1 },
    { id: 1, name: "truong", status: 0 },
    { id: 2, name: "tung", status: 1 },
    { id: 3, name: "truong", status: 0 },
    { id: 4, name: "tung", status: 1 },
    { id: 5, name: "truong", status: 0 },
    { id: 6, name: "tung", status: 1 },
    { id: 7, name: "truong", status: 0 },
    { id: 8, name: "tung", status: 1 },
    { id: 9, name: "truong", status: 0 },
    { id: 10, name: "thanh tung", status: 1 },
  ]);
  const handleClickBlockButton = (i, v) => {
    if (v === 1) {
      setUser(
        users.map((item, index) => {
          if (item.id === i) {
            return { ...item, status: 0 };
          }
          return item;
        })
      );
    } else {
      console.log("Khong the block");
    }
  };
  const isDisable = (i) => {
    return i
      ? "right-admin-main-table-active right-admin-main-table-circle"
      : "right-admin-main-table-circle right-admin-main-table-blocked ";
  };
  useEffect(() => {
    const a = limitForPage(users, 9);
    setTotalPages(a);
  }, [setTotalPages, users]);
  useEffect(() => {
    console.log(page);
  }, [page]);
  const handleChangePage = useCallback(
    (e) => {
      setPage(e);
    },
    [users]
  );
  return (
    <div>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>ID người dùng</th>
            <th>trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {totalPages[page - 1]?.map((item, index) => {
            return (
              <tr>
                <td>{index}</td>
                <td>{item?.name}</td>
                <td>{item?.id}</td>
                <td>
                  <div className="main-admin-table-item-choose">
                    <BsCircleFill className={isDisable(item?.status)} />
                  </div>
                </td>
                <td>
                  <div
                    className={
                      item?.status
                        ? "right-admin-main-table-button"
                        : "right-admin-main-table-button-blocked"
                    }
                    onClick={() => handleClickBlockButton(index, item?.status)}
                  >
                    Block
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {totalPages.length > 1 && (
        <Container style={{ position: "absolute", bottom: "-70px" }}>
          <Row>
            <Col md={{ span: 8, offset: 1 }}>
              <AdminPagination
                total={totalPages.length}
                current={page}
                onChangePage={handleChangePage}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
