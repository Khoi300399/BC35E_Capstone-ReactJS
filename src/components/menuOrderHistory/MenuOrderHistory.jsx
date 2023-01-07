import { Pagination } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const MenuOrderHistory = () => {
  const { profile } = useSelector((state) => state.userReducer);
  const [current, setCurrent] = useState(1);
  const [orderDetail, setOrderDetail] = useState(
    profile?.ordersHistory[0]
      ? profile?.ordersHistory[0]
      : {
          orderDetail: [],
          id: "",
          date: "",
        }
  );
  const onChange = (page) => {
    console.log({ page });
    setCurrent(page);
    setOrderDetail(profile?.ordersHistory[page]);
  };
  return (
    <div className="menu-order">
      <h2 className="title">Order History</h2>
      <div className="table-content">
        <>
          <p className="order-date">
            {` + Orders have been placed on ${orderDetail.date}`}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>img</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.orderDetail?.map(
                ({ name, price, image, quantity }, i) => (
                  <tr key={i}>
                    <td>
                      <span>{orderDetail.id}</span>
                    </td>
                    <td>
                      <img src={image} alt="..." />
                    </td>
                    <td>
                      <span>{name}</span>
                    </td>
                    <td>
                      <span>{price} $</span>
                    </td>
                    <td>
                      <span>{quantity}</span>
                    </td>
                    <td>
                      <span>{(price * quantity).toLocaleString()}</span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
        <Pagination
          defaultCurrent={1}
          onChange={onChange}
          current={current}
          total={profile?.ordersHistory.length}
          className="text-right"
        />
      </div>
    </div>
  );
};

export default MenuOrderHistory;
