import { Add, Edit, FormatListNumberedRtl } from "@material-ui/icons";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <nav>
          <Container>
            <strong>
              <h4>Natural Herbs</h4>
            </strong>
            <li>
              <Link
                to="/admin/productManager"
              >
                <span className='icon'>
                  <FormatListNumberedRtl />
                </span>
                Manage Product
              </Link>
            </li>
            <li>
              <Link to="/admin/addProduct">
                <span className='icon'>
                  <Add />
                </span>
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/admin/productManager">
                <span className='icon'>
                  <Edit />
                </span>
                Edit Product
              </Link>
            </li>
          </Container>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
