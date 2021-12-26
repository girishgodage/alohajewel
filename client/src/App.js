import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/App/NotFound";
import Login from "./components/User/Login";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import PaySuccess from "./components/App/PaySuccess";
import PayCancelled from "./components/App/PayCancelled";

import Blog from "./components/Test/Blog";
import { getFromStorage } from "./utils/storage";

function isAuth() {
  const obj = getFromStorage("jewelry_app");

  if (obj && obj.token) {
    return true;
  } else {
    return false;
  }
}

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shop/:id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/order" component={Orders} />
        <Route exact path="/order/:id" component={Order} />
        {/* <Route path="/checkout" component={Checkout} /> */}
        <Route
          path="/checkout"
          render={() => (!isAuth() ? <Redirect to="/login" /> : <Checkout />)}
        />

        <Route exact path="/success" component={PaySuccess} />
        <Route exact path="/canceled" component={PayCancelled} />
        <Route component={NotFound} />
      </Switch>
      {/* <Link to="/blog">Blog</Link>
    <Link to="/login">Login</Link> */}
      <Footer />
    </>
  );
}

export default App;
