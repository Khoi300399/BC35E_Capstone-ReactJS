import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ShoesCard = (props) => {
  const { prod } = props; // lay product
  const { productFavorite } = useSelector((state) => state.productReducer);
  
  const renderHeart = () => {
      let index = productFavorite.findIndex((f, i) => {
      return f.id === prod.id;
    })

      if (index === -1) {
        return <i className="fa-regular fa-heart" />
      } else {
        return <i className="fa-solid fa-heart" />
      }
  }

  useEffect(() => {
    renderHeart();  
 }, [prod.id])

  return (
    <NavLink to={`/detail/${prod?.id}`} className="card">
      <div className="thumb">
        <img src={prod?.image} alt="..." />
        <div className="icon">
          {renderHeart()}
        </div>
      </div>
      <div className="content">
        <h3>{prod?.name}</h3>
        <p>{prod?.shortDescription}</p>
      </div>
      <div className="button">
        <div>Buy now</div>
        <div>{prod?.price}$</div>
      </div>
    </NavLink>
  );
};

export default ShoesCard;
