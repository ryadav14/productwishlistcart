import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import HttpService from "./services/http-service";
import Product from "./product/product.js";
import WishList from "./wishlist/wishlist";

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.productList = this.productList.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3001/product")
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  }

  productList = () => {
    const list = this.state.products.map((product) => (
      <div className="col-sm-2" key={product._id}>
        <Product product={product} />
      </div>
    ));

    return list;
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React App with Node.js and Mongo Db</h2>
        </div>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row product">{this.productList()}</div>
            </div>
            <div className="col-sm-4 wishlist">
              <WishList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
