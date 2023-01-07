import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  arrCart: [], // add soLuong(num)
  total: 0
}

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {

    addCart: (state, action) => {
      let sp = action.payload;
      state.total += sp.soLuong;

      let prodIndex = state.arrCart.findIndex((o, i) => {
        return o.id === sp.id;
      })

      if (prodIndex === -1) {
        state.arrCart.push(sp)
      } else {
        state.arrCart[prodIndex].soLuong += sp.soLuong
      }
    },

    increment: (state, action) => {
      let { id, amount } = action.payload;
      let prodIndex = state.arrCart.findIndex((o, i) => {
        return o.id === id;
      })
      if (state.arrCart[prodIndex].soLuong === 1 && amount === -1) {
        window.alert ("Order must be greater than 0.  Press DELETE if you want to remove the item from cart.")
      } else {
        state.total += amount;
        state.arrCart[prodIndex].soLuong += amount;
      }
    },

    delProd: (state, action) => {
      let id = action.payload
      let prodIndex = state.arrCart.findIndex((o, i) => {
        return o.id === id;
      })
      state.total -= state.arrCart[prodIndex].soLuong;
      state.arrCart.splice(prodIndex, 1);
    },
    clearCarts: (state) => {
      state.total = 0;
      state.arrCart = []
    }
  }
});

export const { addCart, increment, delProd, clearCarts } = cartReducer.actions

export default cartReducer.reducer

