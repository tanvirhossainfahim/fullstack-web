import { Button, Typography } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from '../App';
import "./Order.css";

function Order() {
  const [loginUser, setLoginUser] = useContext(Context);
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products/order?uid=${loginUser.uid}`)
      .then((res) => res.json())
      .then((data) => setDbData(data));
  }, []);
  return (
    <div className="orderWrap">
      <Container>
        <Typography align="center" variant="h3">
          Order List
        </Typography>
        <Row>
          <Col xs={8}>
            <div className="orderList shadow rounded p-3 mb-3">
              <table>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                <div className="d-flex justify-content-center">
                  <span>
                    {dbData.length === 0 && <img src={spinner} alt="" />}
                  </span>
                </div>
                {dbData.map((data) => (
                  <tr key={data._id}>
                    <td>
                      {" "}
                      <img src={data.image} className="img-fluid image" alt="" />{" "}
                    </td>
                    <td>{data.name}</td>
                    <td>01</td>
                    <td>${data.price}</td>
                  </tr>
                ))}
              </table>
            </div>
          </Col>
          <Col xs={4}>
            <div className="orderForm shadow rounded p-3 mb-3">
              <Typography align="center" variant="h4">
                Billing Address
              </Typography>
              <form>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-control field"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control field"
                />
                <input
                  type="address"
                  placeholder="Your Address"
                  className="form-control field"
                />
                <input
                  type="address"
                  placeholder="Your Zip Code"
                  className="form-control field"
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#3e005d",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Order Submit
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Order;
