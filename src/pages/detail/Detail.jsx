import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShoesCard from "../../components/shoesCard/ShoesCard";
import { addCart } from "../../redux/reducers/cartReducer";
import { getProductDetailAction } from "../../redux/reducers/productReducer";

const Detail = () => {
  const { productDetail } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const params = useParams();

  const getProductById = async () => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
      method: "GET",
    });
    const action = getProductDetailAction(result.data.content);
    dispatch(action);
  };

  useEffect(() => {
    getProductById();
    setNumber(1);
  }, [params.id]);

  const [number, setNumber] = useState(1);

  const addOrder = () => {
    let sp = { ...productDetail };
    sp[`soLuong`] = number;
    sp[`checked`] = false;

    const action = addCart(sp);
    dispatch(action);
  };

  return (
    <>
      <div className="detail">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="thumb">
                <img src={productDetail?.image} id="hinh-anh" alt="..." />
              </div>
            </div>
            <div className="col-md-7">
              <div className="content">
                <h2 id="ten">{productDetail?.name}</h2>
                <p id="mo-ta">{productDetail?.description}</p>
                <div className="size">
                  <h3>Available size</h3>
                  <ul>
                    {productDetail?.size.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div id="gia" className="price">
                  {productDetail?.price}$
                </div>
                <div className="quatity">
                  <span
                    onClick={() => {
                      setNumber(number + 1);
                    }}
                  >
                    +
                  </span>
                  <input type="text" value={number} />
                  <span
                    onClick={() => {
                      number > 1
                        ? setNumber(number - 1)
                        : window.alert("order must be > 0");
                    }}
                  >
                    -
                  </span>
                </div>
                <a
                  href="..."
                  className="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.alert(
                      `${number} pairs of ${productDetail?.name} has been added to cart`
                    );
                    addOrder();
                  }}
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="heading-bar line mt-5">
        <h2>-Realate Product -</h2>
      </div>

      <div className="container realate-product">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div id="productDisplay" className="row">
          {productDetail?.relatedProducts.map((item, index) => {
            return (
              <div className="col-md-4" key={index}>
                <ShoesCard prod={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Detail;
