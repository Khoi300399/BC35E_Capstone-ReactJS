import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";
const pageSize = 6;

const MenuFavourite = () => {
  const { productFavorite } = useSelector((state) => state.productReducer);
  const [current, setCurrent] = useState(1);
  const [listProductFavourite, setListProductFavourite] = useState();

  useEffect(() => {
    setListProductFavourite(
      productFavorite ? productFavorite?.slice(0, 6) : []
    );
  }, [productFavorite]);

  const onChange = (page) => {
    setCurrent(page);
    //trang thứ nhất: là có product thứ 0 -> thứ 5
    //trang thứ hai: có product 6 -> 11
    setListProductFavourite(
      productFavorite?.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      )
    );
  };

  return (
    <div className="menu-favorite">
      <h2 className="title">Favorite</h2>

      <div class="menu-favorite-box row justify-content-center ml-5">
        {listProductFavourite?.map((product) => {
          return (
            <NavLink
              key={product?.id}
              to={`/detail/${product?.id}`}
              className="card col-3 m-3"
            >
              <div className="thumb">
                <img src={product?.image} alt="..." />
              </div>
              <div className="content">
                <h3>{product?.name}</h3>
              </div>
            </NavLink>
          );
        })}
      </div>
      <Pagination
        defaultCurrent={1}
        onChange={onChange}
        current={current}
        pageSize={pageSize}
        total={productFavorite.length}
        className="pl-5 ml-5"
      />
    </div>
  );
};

export default MenuFavourite;
