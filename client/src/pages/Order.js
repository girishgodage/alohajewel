import React from "react";
import { getFromStorage } from "../utils/storage";
import ContactBackground from "../assets/home/category.jpg";
import { Link } from "react-router-dom";
import moment from "moment";

function Order(props) {
  const obj = getFromStorage("jewelry_app");
  const orders = obj.order;
  const orderProps = props.match.params.id;
  const id = orderProps.replace(/:/g, "");

  const orderDet = orders.filter((order) => order._id === id);

  // this.setState({ orderDet[0]: orderDet[0] });
  console.log(orderDet[0].shipping.address);
  return (
    <>
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
                  <div className="home_title">Your Order details</div>
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/home">Home</Link>
                      </li>
                      <li>
                        <Link to="/order">Order</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cart_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="cart_title">Order Details</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="cart_total">
                  {/* <div className="cart_title">Order total</div> */}
                  <ul>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Shipping Info :</div>
                      <div className="cart_total_price ml-auto">
                        {orderDet[0].shipping.address},
                        {orderDet[0].shipping.city},
                        {orderDet[0].shipping.postalCode},
                        {orderDet[0].shipping.country}
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Payment Info:</div>
                      <div className="cart_total_price ml-auto">
                        <div>
                          Payment Method: {orderDet[0].payment.paymentMethod}
                        </div>
                        <div>
                          {orderDet[0].isPaid
                            ? "Paid at " +
                              moment(orderDet[0].paidAt).format("DD/MM/YYYY")
                            : "Not Paid."}
                        </div>
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Delivery Info:</div>
                      <div className="cart_total_price ml-auto">
                        <div>
                          {orderDet[0].isDelivered
                            ? "Delivered at " +
                              moment(orderDet[0].deliveredAt).format(
                                "DD/MM/YYYY"
                              )
                            : "Not Delivered."}
                        </div>
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Order Comment</div>
                      <div className="cart_total_price ml-auto">
                        {orderDet[0].orderComment}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4"></div>
            </div>

            <div className="row">
              <div className="col">
                <div className="cart_bar d-flex flex-row align-items-center justify-content-start">
                  <div className="cart_bar_title_name">Product</div>
                  <div className="cart_bar_title_content ml-auto">
                    <div className="cart_bar_title_content_inner d-flex flex-row align-items-center justify-content-end">
                      <div className="cart_bar_title_price">Price</div>
                      <div className="cart_bar_title_quantity">Quantity</div>
                      <div className="cart_bar_title_total">Total</div>
                      <div className="cart_bar_title_button"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="cart_products">
                  <ul>
                    {orderDet[0].orderItems.map((product) => (
                      <li
                        key={id}
                        className=" cart_product d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-start"
                      >
                        {/* product image & name*/}
                        <div className="cart_product_image">
                          <img src={product.image} alt="" />
                        </div>
                        <div className="cart_product_name">
                          <Link to={`/shop/:${id}`}>{product.name}</Link>
                        </div>
                        {/* price quantity total delete*/}
                        <div className="cart_product_info ml-auto">
                          <div className="cart_product_info_inner d-flex flex-row align-items-center justify-content-md-end justify-content-start">
                            <div className="cart_product_price">
                              ₹{product.price}
                            </div>
                            <div className="cart_product_price">
                              {product.qty}
                            </div>
                            <div className="cart_product_total">
                              ₹{product.price * product.qty}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row cart_extra">
              <div className="col-lg-6"></div>
              <div className="col-lg-5 offset-lg-1">
                <div className="cart_total">
                  <div className="cart_title">Order total</div>
                  <ul>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Subtotal</div>
                      <div className="cart_total_price ml-auto">
                        ₹{orderDet[0].itemsPrice}
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Tax</div>
                      <div className="cart_total_price ml-auto">
                        ₹{orderDet[0].taxPrice}
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Shipping</div>
                      <div className="cart_total_price ml-auto">
                        ₹{orderDet[0].shippingPrice}
                      </div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="cart_total_title">Total</div>
                      <div className="cart_total_price ml-auto">
                        ₹{orderDet[0].totalPrice}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
