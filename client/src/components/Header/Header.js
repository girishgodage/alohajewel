import React from "react";
import { Link } from "react-router-dom";

import shoppingBag from "../../assets/images/shopping-bag.svg";
import avatar from "../../assets/images/avatar.svg";
import { ProductConsumer } from "../../context";
import { isMobile } from "react-device-detect";

import Menu from "./Menu";

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header_inner d-flex flex-row align-items-center justify-content-start">
          <div className="logo">
            <Link to="/">
              <img src="/icon.png" width="50" height="50" />
              {isMobile ? " AJ" : " Aloha Jewels"}
            </Link>
          </div>
          <nav className="main_nav">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="header_content ml-auto">
            <div className="shopping">
              <Link to="/cart">
                <div className="cart">
                  <img src={shoppingBag} alt="" />
                  <ProductConsumer>
                    {(value) => {
                      const length = value.cart.length;
                      if (length < 1) return null;
                      return (
                        <div className="cart_num_container">
                          <div className="cart_num_inner">
                            <div className="cart_num">{length}</div>
                          </div>
                        </div>
                      );
                    }}
                  </ProductConsumer>
                </div>
              </Link>

              <Link to="/login">
                <div className="avatar">
                  <img src={avatar} alt="" />
                </div>
              </Link>
            </div>
          </div>

          <div className="burger_container d-flex flex-column align-items-center justify-content-around menu_mm">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </header>
      <Menu />
    </>
  );
};

export default Header;
