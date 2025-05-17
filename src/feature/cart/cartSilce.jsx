import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // handle add to cart feature
    addProduct: (state, action) => {
      const productId = action.payload.id;
      if (state.cart[productId]) {
        state.cart[productId].quantity += 1;
      } else {
        state.cart[productId] = {
          id: productId,
          quantity: 1,
          product: action.payload,
        };
      }
    },

    // handle remove item feature
    removeProduct: (state, action) => {
      const productId = action.payload.id;
      if (state.cart[productId]) {
        if (state.cart[productId].quantity > 1) {
          state.cart[productId].quantity -= 1;
        } else {
          delete state.cart[productId];
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
