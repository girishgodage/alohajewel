import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactBackground from "../assets/home/bg1-1.jpg";
import ProductContainer from "../components/App/ProductContainer";
import { useContext } from "react";
import { ProductContext } from "../context";
import manifyingGlass from "../assets/images/magnifying-glass.svg";

export const Shop = () => {
  const context = useContext(ProductContext);
  const handleChange = context.handleChange;
  const clearFilter = context.clearFilter;
  const sortByPrice = context.sortByPrice;
  const sortByRating = context.sortByRating;
  const getAllCategory = context.getAllCategory;
  const [search, setSearch] = useState("");

  let categories = getAllCategory();

  return (
    <div>
      <div
        className="home_background"
        style={{ backgroundImage: `url(${ContactBackground})` }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="home_container">
              <div className="home_content">
                <div className="home_title">Shop</div>
                <div className="breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>Shop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sidebar_left clearfix">
                <div className="sidebar_section">
                  <div className="sidebar_title">Categories</div>
                  <div className="sidebar_section_content">
                    <ul className="inline">
                      {categories.map((category) => {
                        return (
                          <li>
                            <input
                              type="button"
                              className="category_filter"
                              onClick={handleChange}
                              name={category}
                              value={category}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="sidebar_section">
                  <div className="sidebar_title">Search</div>
                  <div>
                    <ProductContext>
                      {(value) => {
                        function SearchData(e) {
                          e.preventDefault();
                          value.searchData(search);
                          setSearch("");
                        }
                        return (
                          <form onSubmit={SearchData}>
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
                        );
                      }}
                    </ProductContext>
                  </div>
                  <div className="sidebar_section_content">
                    {/* <ul className="inline">
                      <li>
                        <div
                          className="rating_5 raStar_5"
                          data-rating="5"
                          onClick={handleChange}
                        >
                          <i className="fa fa-star raStar_5"></i>
                          <i className="fa fa-star raStar_5"></i>
                          <i className="fa fa-star raStar_5"></i>
                          <i className="fa fa-star raStar_5"></i>
                          <i className="fa fa-star raStar_5"></i>
                        </div>
                      </li>
                      <li>
                        <div
                          className="rating_4 raStar_4"
                          data-rating="4"
                          onClick={handleChange}
                        >
                          <i className="fa fa-star raStar_4"></i>
                          <i className="fa fa-star raStar_4"></i>
                          <i className="fa fa-star raStar_4"></i>
                          <i className="fa fa-star raStar_4"></i>
                        </div>
                      </li>
                      <li>
                        <input
                          type="button"
                          className="category_filter"
                          onClick={handleChange}
                          value="Other"
                        />
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="product_sorting clearfix">
                <div className="sorting">
                  <ul className="item_sorting">
                    <li>
                      <span onClick={clearFilter} className="show_all_btn">
                        Show all
                      </span>
                      {/* <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            <ul>
                                                <li className="product_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'><span>Show All</span></li>
                                                <li className="product_sorting_btn" data-isotope-option='{ "sortBy": "price" }'><span>Price</span></li>
                                                <li className="product_sorting_btn" data-isotope-option='{ "sortBy": "stars" }'><span>Stars</span></li>
                                            </ul> */}
                    </li>
                    <li>
                      <span onClick={sortByPrice} className="price_btn">
                        By price
                      </span>
                    </li>
                    <li>
                      <span onClick={sortByRating} className="star_btn">
                        By stars
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ProductContainer />
        </div>
      </div>
    </div>
  );
};

export default Shop;
