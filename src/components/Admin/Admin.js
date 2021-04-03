import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct/AddProduct";
import "./Admin.css";
import Edit from "./Edit/Edit";
import ProductManager from "./ProductManager/ProductManager";
import Sidebar from "./Sidebar/Sidebar";
function Admin() {
  return (
    <>
      <Router>
        <div className="allwrapped">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="content">
            <Switch>
              <Route path="/admin/productManager">
                <ProductManager />
              </Route>
              <Route path="/admin/addProduct">
                <AddProduct />
              </Route>
              <Route path="/admin/editProduct/:id">
                <Edit />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default Admin;
