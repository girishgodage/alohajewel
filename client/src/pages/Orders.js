import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ContactBackground from "../assets/home/category.jpg";
import { getFromStorage, setInStorage } from "../utils/storage";
import "../utils/custom";
import trash from "../assets/images/trash.png";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true,
      isAdmin: false,
    };
  }
  fetchData = () => {
    const obj = getFromStorage("jewelry_app");
    let userId = "";
    let isAdmin;
    if (obj && obj.token) {
      userId = obj.userId;
      isAdmin = obj.isAdmin;
    }
    if (obj && obj.token) {
      let orderUrl;
      if (isAdmin) {
        orderUrl = "/api/order";
      } else {
        orderUrl = "/api/order/mine/" + userId;
      }
      fetch(orderUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setInStorage("jewelry_app", {
            token: obj.token,
            userId: obj.userId,
            firstName: obj.firstName,
            lastName: obj.lastName,
            isAdmin: obj.isAdmin,
            cart: obj.cart,
            email: obj.email,
            order: json,
          });
          this.setState({
            orders: json,
            loading: false,
            isAdmin: isAdmin,
          });
        });
    }
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchData();
  }
  clickHandler = (order) => {
    const updateOrderurl =
      "http://localhost:3000/api/order/deliver/" + order._id;
    fetch(updateOrderurl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.fetchData();
        this.forceUpdate();
      });
  };

  deleteHandler = (order) => {
    //dispatch(deleteOrder(order._id));
    const deleteOrderurl = "/api/order/" + order._id;
    fetch(deleteOrderurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.fetchData();
        this.forceUpdate();
      });
  };

  render() {
    const { orders, loading, isAdmin } = this.state;
    console.log(isAdmin);

    return loading ? (
      <div>Loading...</div>
    ) : isAdmin ? (
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
                  <div className="home_title">Your Orders</div>
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/home">Home</Link>
                      </li>
                      <li>Order</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="order_title">your Orders</div>
              </div>
            </div>
            <div className="content content-margined">
              <div className="order-list">
                <table className="table" striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>USER</th>
                      <th>Contact</th>
                      <th>PAID</th>
                      <th>PAID AT</th>
                      <th>DELIVERED</th>
                      <th>DELIVERED AT</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <Link to={`/order/:${order._id}`}>{order._id}</Link>
                        </td>
                        <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                        <td> ₹{order.totalPrice}</td>
                        <td>{order.userName}</td>
                        <td>{order.contactNumber}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>{moment(order.paidAt).format("DD/MM/YYYY")}</td>
                        <td>{order.isDelivered.toString()}</td>
                        <td>
                          {order.isDelivered
                            ? moment(order.deliveredAt).format("DD/MM/YYYY")
                            : ""}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => this.deleteHandler(order)}
                            className="order_product_remove"
                          >
                            <img src={trash} alt="" />
                          </button>
                          {order.isDelivered ? (
                            <div></div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => this.clickHandler(order)}
                              className="order_product_remove"
                            >
                              Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <div className="home_title">Your Orders</div>
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/home">Home</Link>
                      </li>
                      <li>Order</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="order_title">your Orders</div>
              </div>
            </div>
            <div className="content content-margined">
              <div className="order-list">
                <table className="table" striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>

                      <th>PAID</th>
                      <th>PAID AT</th>
                      <th>DELIVERED</th>
                      <th>DELIVERED AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <Link to={`/order/:${order._id}`}>{order._id}</Link>
                        </td>
                        <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                        <td> ₹{order.totalPrice}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>{moment(order.paidAt).format("DD/MM/YYYY")}</td>
                        <td>{order.isDelivered.toString()}</td>
                        <td>
                          {order.isDelivered
                            ? moment(order.deliveredAt).format("DD/MM/YYYY")
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
