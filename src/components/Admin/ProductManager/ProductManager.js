import { Box, Button, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductManager.css";

function ProductManager() {
  const [message, setMessage] = useState("");
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) => setDbData(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
          .then((res) => res.json())
          .then((data) => setDbData(data));
        setMessage("Product has been deleted !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Box>
              <Typography variant="h4">Manage Product</Typography>
            </Box>
          </Col>
        </Row>
        <div className="productManage">
          {message && (
            <h6 class="alert alert-success" role="alert">
              {message}
            </h6>
          )}
          <Row>
            <Col>
              <table>
                <tr>
                  <th>#No</th>
                  <th>Product Name</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                <div className="d-flex justify-content-center w-100">
                  <span>
                    {dbData.length === 0 && <img src={spinner} alt="" />}
                  </span>
                </div>
                {dbData.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.product}</td>
                    <td>{data.weight}</td>
                    <td>${data.price}</td>
                    <td>
                      <Button color="primary">
                        <Link to={`/admin/editProduct/${data._id}`}>
                          {" "}
                          <Edit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(data._id)}
                        color="secondary"
                      >
                        {" "}
                        <Delete />{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
              </table>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ProductManager;
