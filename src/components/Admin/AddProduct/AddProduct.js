import { Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AddProduct.css";
function AddProduct() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    product: "",
    weight: "",
    price: "",
  });

  const formClear = () => {
    setValues({
      product: "",
      weight: "",
      price: "",
    });
  };

  const handleChange = (e) => {
    const value = { ...values };
    value[e.target.name] = e.target.value;
    setValues(value);
  };
  const handleImage = (e) => {
    const imageData = new FormData();
    imageData.set("key", "b5b8f2f92d6b141a29f44de2a89cdbc7");
    imageData.append("image", e.target.files[0]);
    axios.post(`https://api.imgbb.com/1/upload`, imageData).then((result) => {
      setImage(result.data.data.display_url);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formClear();
    const fieldData = { ...values };
    fieldData.imageUrl = image;
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fieldData),
    })
      .then((result) => {
        console.log(result);
        setMessage("Product Insert Successfully !");
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
              <Typography variant="h4">Add Product</Typography>
            </Box>
          </Col>
        </Row>
        <div className="addProductField">
          {message && (
            <h6 class="alert alert-success" role="alert">
              {message}
            </h6>
          )}
          <form action="/createProduct" onSubmit={handleSubmit} method="post">
            <Row>
              <Col>
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  value={values.product}
                  onChange={handleChange}
                  autoComplete="off"
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
                  autoComplete="off"
                  placeholder="Product Weight"
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
                  autoComplete="off"
                  placeholder="Product Price..."
                  required
                />
              </Col>
              <Col>
                <label htmlFor="productUpload">Upload</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImage}
                  className="form-control"
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
                  Save
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default AddProduct;
