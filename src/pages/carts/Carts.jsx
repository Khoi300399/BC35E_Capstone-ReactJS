import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delProd,
  increment,
  clearCarts,
} from "../../redux/reducers/cartReducer";

const Carts = () => {
  const { arrCart } = useSelector((state) => state.cartReducer);
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const xoaSP = (item) => {
    dispatch(delProd(item.id));
  };

  const tangGiam = (item, num) => {
    dispatch(increment({ id: item.id, amount: num }));
  };

  const pushOrder = async () => {
    let info = arrCart.map((p, i) => {
      return {
        productId: p.id,
        quantity: p.soLuong,
      };
    });
    const data = {
      orderDetail: info,
      email: profile.email,
    };

    const result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/order",
      method: "POST",
      data: data,
    });
    if (result && result.status === 200) {
      alert("Congratulation. Your order has been completed");
    } else {
      alert("Woooops...your order was failed.  Please try again.");
    }
    dispatch(clearCarts());
  };
  return (
    <div className="cart">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="container">
        <h1>Carts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                />
              </th>
              <th>Id</th>
              <th className="td-img text-center">Img</th>
              <th className="td-name">Name</th>
              <th>Price</th>
              <th className="text-center w-250">Quantity</th>
              <th className="text-center">Total</th>
              <th className="text-center w-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {arrCart?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="defaultCheck1"
                    />
                  </td>
                  <td>{item.id}</td>
                  <td className="td-img">
                    <img src={item.image} alt="..." />
                  </td>
                  <td className="td-name">{item.name}</td>
                  <td>{item.name}</td>
                  <td className="text-center">
                    <div className="quatity">
                      <span
                        onClick={() => {
                          tangGiam(item, 1);
                        }}
                      >
                        +
                      </span>
                      <input type="text" value={item.soLuong} />
                      <span
                        onClick={() => {
                          tangGiam(item, -1);
                        }}
                      >
                        -
                      </span>
                    </div>
                  </td>
                  <td className="text-center">{item.soLuong*item.price}</td>
                  <td>
                    <div className="button">
                      <a href="..." type="button" className="btn btn-primary">
                                                Edit
                                            </a>
                      <a
                        href="..."
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          xoaSP(item);
                        }}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-right">
          <a
            href="..."
            type="button"
            className="btn btn-warning"
            onClick={(e) => {
              e.preventDefault();
              pushOrder();
            }}
          >
            Submit order
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carts;
