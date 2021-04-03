import { Button, Container } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    fetch(`https://blueberry-cobbler-59605.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) => setDbData(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="homeProduct">
      <Container>
        <Row>
          <Col md={12}>
            <div className="productSearchBar">
              <span className="searchIcon">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="searchBar form-control"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Product Here..."
              />
              <Button
                className="button"
                variant="contained"
                style={{ backgroundColor: "#3e005d", color: "white" }}
              >
                Search
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <span>{dbData.length === 0 && <img src={spinner} alt="" />}</span>
            </div>
          </Col>
        </Row>
        <Row>
          {dbData
            .filter((value) => {
              if (searchTerm == "") {
                return value;
              } else if (
                value.product.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              }
            })
            .map((data) => (
              <Col key={data._id} md={4}>
                <div>
                  <Card>
                    <Card.Img
                      variant="top"
                      style={{ height: "200px" }}
                      src={data.imageUrl}
                      className="img-fluid"
                    />
                    <Card.Body>
                      <Card.Text>
                        {data.product} - {data.weight}
                      </Card.Text>

                      <div
                        className="productBtn"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          style={{ color: "#3e005d", fontWeight: "600" }}
                        >
                          ${data.price}
                        </Button>

                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#3e005d",
                            color: "white",
                            fontSize: "15px",
                          }}
                        >
                          <Link to={`/checkout/${data._id}`}>Buy Now</Link>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
