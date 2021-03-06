import React, { Component } from "react";
import Product from "./Product";
import { ProductContext } from "../../context";
// import Loading from './Loading';

export default class ProductContainer extends Component {
  static contextType = ProductContext;

  render() {
    let value = this.context;
    let loading = value.loading;
    //let products = value.products;
    let filteredProducts = value.filteredProducts;

    var query = window.location.search.substring(1);
    console.log(query);

    if (query.length > 0) {
      filteredProducts = value.filteredProducts.filter(
        (product) => product.category.toLowerCase() === query.toLowerCase()
      );
    }

    return (
      <>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="row products_container">
            {filteredProducts.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        )}
      </>
    );
  }
}
