import React, { useState } from "react";
import { Link } from "react-router-dom";
import manifyingGlass from "../../assets/images/magnifying-glass.svg";
import shoppingBag from "../../assets/images/shopping-bag.svg";
import avatar from "../../assets/images/avatar.svg";
import { ProductConsumer } from "../../context";

import Menu from "./Menu";

export const Header = () => {
  const [search, setSearch] = useState("");

  function SearchData(e) {
    e.preventDefault();
    window.location.href = "/shop?" + search;
  }

  return (
    <>
      <header className="header">
        <div className="header_inner d-flex flex-row align-items-center justify-content-start">
          <div className="logo">
            <Link to="/">Aloha Jewel</Link>
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
            <div className="search header_search">
              <form action="#" onSubmit={SearchData}>
                <input
                  type="search"
                  className="search_input"
                  required="required"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  id="search_button"
                  className="search_button"
                >
                  <img src={manifyingGlass} alt="" />
                </button>
              </form>
            </div>
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
