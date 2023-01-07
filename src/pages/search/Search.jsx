import React, { useState } from "react";
import ShoesCard from "../../components/shoesCard/ShoesCard";
import axios from "axios";
import _ from "lodash";

const Search = () => {
  const [searchProd, setSearchProd] = useState("");
  const [products, setProducts] = useState([]);

  const getSearch = async (event) => {
    event.preventDefault();
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${searchProd}`,
      method: "GET",
    });
    console.log("search");
    setProducts(result.data.content);
  };

  return (
    <div class="search">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div class="search-form">
        <p>Search</p>
        <form>
          <input
            value={searchProd}
            onChange={(e) => setSearchProd(e.target.value)}
            type="text"
            placeholder="Product Name"
          />
          <button onClick={getSearch}>Search</button>
        </form>
      </div>
      <div class="heading-bar bg w-100 mt-5">
        <h2>Search result</h2>
      </div>
      <div class="container">
        <div class="search-form fillter">
          <p>Price</p>
          <form>
            <div class="icon">
              <input type="text" placeholder="descending" disabled={true} />
              <img
                src="../img/Polygon 3.png"
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  setProducts(_.orderBy(products, ["price"], ["desc"]));
                }}
              />
            </div>
            <div class="icon">
              <input type="text" placeholder="ascending" disabled={true} />
              <img
                class="rotage"
                src="../img/Polygon 3.png"
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  setProducts(_.orderBy(products, ["price"], ["asc"]));
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div class="container">
        <div id="productDisplay" class="row">
          {products.map((p, i) => {
            return (
              <div class="col-md-4" key={i}>
                <ShoesCard prod={p} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
