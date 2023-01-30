import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import { limitForPage } from "../../../../utils/limitForPage";
import { AdminPagination } from "./pagination";
import { Container, Row, Col } from "react-bootstrap";
import { getAllUsers } from "../../../../../api/apiUser";
export default function AdminTable() {
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUsers, getAllUsers]);
  const handleClickBlockButton = (i, v) => {
    if (v === 0) {
      setUsers(
        users.map((item, index) => {
          if (item.id === i) {
            return { ...item, status: 1 };
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
                <td>{item?.username}</td>
                <td>{item?.id}</td>
                <td>
                  <div className="main-admin-table-item-choose">
                    <BsCircleFill className={isDisable(!item?.status)} />
                  </div>
                </td>
                <td>
                  <div
                    className={
                      !item?.status
                        ? "right-admin-main-table-button"
                        : "right-admin-main-table-button-blocked"
                    }
                    onClick={() =>
                      handleClickBlockButton(item.id, item?.status)
                    }
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
