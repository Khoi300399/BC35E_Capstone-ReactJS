import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductFavorite } from "../../redux/reducers/productReducer";
import { http } from "../../util/config";

const ShoesCard = (props) => {
  const { prod } = props; // lay product
  const { productFavorite } = useSelector((state) => state.productReducer);

  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unlike = (productIndex) => {
    if (!userLogin) {
      alert("Ban can phai login");
      return;
    }

    // unlike
    const newProductFavorite = [...productFavorite];
    newProductFavorite.splice(productIndex, 1);
    dispatch(setProductFavorite(newProductFavorite));
    http.get("/api/Users/unlike", {
      params: {
        productId: prod.id,
      },
    });
  };

  const handleLike = () => {
    if (!userLogin) {
      alert("Ban can phai login");
      return;
    }

    // like
    const newProductFavorite = [...productFavorite];
    newProductFavorite.push(prod);
    dispatch(setProductFavorite(newProductFavorite));

    http.get("/api/Users/like", {
      params: {
        productId: prod.id,
      },
    });
  };

  const renderHeart = () => {
    let index = productFavorite.findIndex((f, i) => {
      return f.id === prod.id;
    });

    if (index === -1) {
      return (
        <i
          onClick={(event) => {
            event.stopPropagation();
            handleLike();
          }}
          className="fa-regular fa-heart"
        />
      );
    } else {
      return (
        <i
          onClick={(event) => {
            event.stopPropagation();
            unlike(index);
          }}
          className="fa-solid fa-heart"
        />
      );
    }
  };

  useEffect(() => {
    renderHeart();
  }, [prod.id]);

  return (
    <div onClick={() => navigate("/detail/" + prod?.id)} className="card">
      <div className="thumb">
        <img src={prod?.image} alt="..." />
        <div className="icon">{renderHeart()}</div>
      </div>
      <div className="content">
        <h3>{prod?.name}</h3>
        <p>{prod?.shortDescription}</p>
      </div>
      <div className="button">
        <div>Buy now</div>
        <div>{prod?.price}$</div>
      </div>
    </div>
  );
};

export default ShoesCard;
