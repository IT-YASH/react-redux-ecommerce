import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // {id, title, price, quantity}
  },
  reducers: {
    addToCart(state, action) {
      const item = state.items.find((p) => p.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
