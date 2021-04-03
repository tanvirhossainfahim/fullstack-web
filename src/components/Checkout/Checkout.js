import { Button, Container, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Context } from "../App";
import "./Checkout.css";

function Checkout() {
  const [loginUser, setLoginUser] = useContext(Context);
  const [dbData, setDbData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) => setDbData(data));
  }, []);

  const findEl = dbData.find((el) => el._id === id);
  const handleCheckout = () => {
    const setOrderData = {
      name: findEl.product,
      price: findEl.price,
      image: findEl.imageUrl,
      uid: loginUser.uid,
    };
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(setOrderData),
    })
      .then(() => {
        fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
          .then((res) => res.json())
          .then((data) => setDbData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="checkout">
      <Container>
        <Row>
          <Col md={8} className="m-auto">
            <div className="checkoutForm">
              <div className="table">
                <Typography variant="h4">Checkout</Typography>
                <table>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                  <tr>
                    <td>{findEl?.product}</td>
                    <td className="center">1</td>
                    <td>${findEl?.price}</td>
                  </tr>
                  <tr className="total">
                    <td>Total</td>
                    <td></td>
                    <td>${findEl?.price}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <Button
                        onClick={handleCheckout}
                        variant="contained"
                        style={{ backgroundColor: "#3e005d", color: "white" }}
                      >
                        <Link to="/orders">Checkout</Link>
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
