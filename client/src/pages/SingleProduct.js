import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotFound from "../components/App/NotFound";
import { GlassMagnifier, SideBySideMagnifier } from "react-image-magnifiers";
import { ProductConsumer, ProductContext } from "../context";
import ContactBackground from "../assets/home/bg4-1.jpg";
import "../utils/custom";

// original version
export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      allowOverflow: true,
      magnifierBorderSize: 5,
      magnifierBorderColor: "rgba(255, 255, 255, .5)",
      magnifierSize: "30%",
      square: false,

      alwaysInPlace: false,
      overlayOpacity: 0.6,
      switchSides: false,
      fillAvailableSpace: false,
      fillAlignTop: false,
      fillGapLeft: 0,
      fillGapRight: 10,
      fillGapTop: 10,
      fillGapBottom: 10,
    };
  }
  static contextType = ProductContext;

  //componentDidMount(){}

  render() {
    const value = this.context;
    const getProduct = value.getProduct;
    // const getCartItem = value.getCartItem;
    const id = this.state.id.replace(/:/g, "");
    const loading = value.loading;

    let product = getProduct(id);

    // getCartItem;
    if (!product) {
      return (
        <div className="error">
          <NotFound />
          <h3>No such item could be found...</h3>
          <Link to="/" className="btn-primary">
            back to home
          </Link>
        </div>
      );
    }
    const {
      allowOverflow,
      magnifierSize,
      magnifierBorderSize,
      magnifierBorderColor,
      square,
      alwaysInPlace,
      overlayOpacity,
      switchSides,
      fillAvailableSpace,
      fillAlignTop,
      fillGapLeft,
      fillGapRight,
      fillGapTop,
      fillGapBottom,
    } = this.state;

    // const { name, slug, description, capacity, price, dance, fitness, images, inCart } = room;
    // const [mainImg, ...defaultImg] = images;
    return (
      <>
        {loading ? (
          <p>loading...</p>
        ) : (
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
                      <div className="home_title">Product</div>
                      <div className="breadcrumbs">
                        <ul>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/shop">Shop</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sProduct">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="current_page">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/shop">Shop</Link>
                        </li>
                        <li>{product.name}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row product_row">
                  <div className="col-lg-7">
                    <div>
                      <div className="product_image_large">
                        {/* <img src={product.images[0]} alt={product.name} /> */}
                        <GlassMagnifier
                          className="input-position"
                          imageSrc={product.images[0]}
                          // largeImageSrc={product.images[0]}
                          allowOverflow={allowOverflow}
                          magnifierSize={magnifierSize}
                          magnifierBorderSize={magnifierBorderSize}
                          magnifierBorderColor={magnifierBorderColor}
                          square={square}
                        />
                        {/* <SideBySideMagnifier
                          className="input-position"
                          style={{ order: switchSides ? "1" : "0" }}
                          imageSrc={product.images[0]}
                          largeImageSrc={product.images[0]}
                          alwaysInPlace={alwaysInPlace}
                          overlayOpacity={overlayOpacity}
                          switchSides={switchSides}
                          zoomPosition="left"
                          inPlaceMinBreakpoint={641}
                          fillAvailableSpace={fillAvailableSpace}
                          fillAlignTop={fillAlignTop}
                          fillGapTop={fillGapTop}
                          fillGapRight={fillGapRight}
                          fillGapBottom={fillGapBottom}
                          fillGapLeft={fillGapLeft}
                          zoomContainerBorder="1px solid #ccc"
                          zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                        /> */}
                      </div>
                      <div className="product_image_thumbnails d-flex flex-row align-items-start justify-content-start">
                        <div
                          className="product_image_thumbnail"
                          style={{
                            backgroundImage: `url(${product.images[0]})`,
                          }}
                          data-image={product.images[0]}
                        ></div>
                        <div
                          className="product_image_thumbnail"
                          style={{
                            backgroundImage: `url(${product.images[1]})`,
                          }}
                          data-image={product.images[1]}
                        ></div>
                        <div
                          className="product_image_thumbnail"
                          style={{
                            backgroundImage: `url(${product.images[2]})`,
                          }}
                          data-image={product.images[2]}
                        ></div>
                        <div
                          className="product_image_thumbnail"
                          style={{
                            backgroundImage: `url(${product.images[3]})`,
                          }}
                          data-image={product.images[3]}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="product_content">
                      <div className="product_name">{product.name}</div>
                      <div className="product_price">???{product.price}</div>
                      <div className="rating rating_4" data-rating="4">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>

                      <div className="in_stock_container">
                        <div className="in_stock in_stock_true"></div>
                        <span>in stock</span>
                        <ProductConsumer>
                          {(value) => {
                            return (
                              <div
                                className="button cart_button"
                                id="addToCart"
                              >
                                <a
                                  onClick={() => {
                                    value.addToCart(id);
                                  }}
                                >
                                  add to cart
                                </a>
                              </div>
                            );
                          }}
                        </ProductConsumer>
                      </div>
                      {product.ar ? (
                        <div className="ar_btn_container">
                          <div className="button ar_btn">
                            <a
                              href="https://www.instagram.com/a/r/?effect_id=216138253076637"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Try Me
                            </a>
                          </div>
                        </div>
                      ) : null}

                      <div className="product_text">
                        <p>{product.description}</p>

                        <div className="product_size_container">
                          {/* <span>Size</span>
                                                    <div className="product_size">
                                                        <ul className="d-flex flex-row align-items-start justify-content-start">
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="radio_1"
                                                                    name="product_radio"
                                                                    value="XS"
                                                                    className="regular_radio radio_1"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="radio_1">XS</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="radio_2"
                                                                    name="product_radio"
                                                                    value="S"
                                                                    className="regular_radio radio_2"
                                                                    onChange={handleChange}
                                                                // checked
                                                                />
                                                                <label htmlFor="radio_2">S</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="radio_3"
                                                                    name="product_radio"
                                                                    value="M"
                                                                    className="regular_radio radio_3"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="radio_3">M</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="radio_4"
                                                                    name="product_radio"
                                                                    value="L"
                                                                    className="regular_radio radio_4"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="radio_4">L</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="radio_5"
                                                                    name="product_radio"
                                                                    value="XL"
                                                                    className="regular_radio radio_5"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="radio_5">XL</label>
                                                            </li>
                                                        </ul>
                                                    </div> */}
                          {/* addToCart button */}
                          <ProductConsumer>
                            {(value) => {
                              return (
                                <div
                                  className="button cart_button"
                                  id="addToCart"
                                >
                                  <a
                                    onClick={() => {
                                      value.addToCart(id);
                                    }}
                                  >
                                    add to cart
                                  </a>
                                </div>
                              );
                            }}
                          </ProductConsumer>
                          {/* addToCart button end*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
