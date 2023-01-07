import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config.jsx";

const initialState = {
  arrProduct: [],
  productDetail: null,
  productFavorite: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    getFavoriteAction: (state, action) => {
      state.productFavorite = action.payload;
    },
    setProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    },
  },
});

export const getFavoriteApi = () => {
  return async (dispatch) => {
    const result = await http.get("/api/Users/getproductfavorite");
    dispatch(getFavoriteAction(result.data.content.productsFavorite));
  };
};

export const {
  getProductAction,
  getProductDetailAction,
  getFavoriteAction,
  setProductFavorite,
} = productReducer.actions;
export default productReducer.reducer;
