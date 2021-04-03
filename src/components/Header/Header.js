import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../App";
import "./Header.css";

function Header() {
  const [loginUser, setLoginUser] = useContext(Context);
  console.log(loginUser.uid);
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ background: "#3edc81" }}
        variant="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">Herbal Products</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/orders">Orders</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/productManager">Admin</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/deals">Deals</Link>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link className="login">
                {loginUser.email ? (
                  <h4 style={{ color: "#3e005d" }}>{loginUser.displayName} <img className="headerImg" src={loginUser.photoURL} alt=""/> </h4>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#3e005d" }}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
