import React from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./context";

import {
  BrowserRouter as Router,
  // Route,
  // Link,
  // Switch
} from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap";
import "@popperjs/core";
import "./styles/vendor/normalize.css";
import "./styles/vendor/bootstrap4/bootstrap.min.css";
import "./styles/vendor/font-awesome-4.7.0/css/font-awesome.min.css";
import "./styles/css/login.css";
import "./styles/css/util.css";
import "./styles/css/main_styles.css";
import "./styles/css/responsive.css";
import "./styles/css/contact.css";
import "./styles/css/contact_responsive.css";
import "./styles/css/product.css";
import "./styles/css/product_responsive.css";
import "./styles/css/categories.css";
import "./styles/css/category_responsive.css";
import "./styles/css/cart.css";
import "./styles/css/cart_responsive.css";
import "./styles/css/checkout.css";
import "./styles/css/checkout_responsive.css";
import "./styles/css/order.css";
import ScrollToTop from "./components/ScrollToTop/scrolltotop";

ReactDOM.render(
  <ProductProvider>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </ProductProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
