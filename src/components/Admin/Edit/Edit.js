import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import "./Edit.css";

function Edit() {
  const [message, setMessage] = useState('')
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) => setDbData(data));
  }, []);
  const { id } = useParams();
  const [values, setValues] = useState({
    product: "",
    weight: "",
    price: "",
  });
  const handleChange = (e) => {
    const value = { ...values };
    value[e.target.name] = e.target.value;
    setValues(value);
  };
  const handleSetValue = () => {
    const findEl = dbData.find((el) => el._id === id);
    const { product, weight, price } = findEl;
    setValues({
      product: product,
      weight: weight,
      price: price,
    });
  };// Set value in edit field
  const handleEdit = (e) => {
    e.preventDefault();
    const data = {...values}
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
          .then((res) => res.json())
          .then((data) => setDbData(data));
          setMessage('Update Successfully !');
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
              <Typography variant="h4">Edit Product</Typography>
            </Box>
          </Col>
        </Row>
        <div className="addProductField">
          {message && <h6 class="alert alert-success" role="alert">{message}</h6>}
          <form action="/admin/productManager" onSubmit={handleEdit}>
            <Row>
              <Col>
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  value={values.product}
                  onChange={handleChange}
                  placeholder="Product Name..."
                  required
                />
              </Col>
              <Col>
                <label htmlFor="productWeight">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange}
                  placeholder="Product Weight..."
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="Product Price..."
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#3e005d",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Update
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="contained"
                  onClick={handleSetValue}
                  style={{
                    backgroundColor: "#3e005d",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Set Value
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Edit;
