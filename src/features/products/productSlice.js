import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProducts();
      return data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    category: "all",
    page: 1,
    limit: 6,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategory, setPage } = productSlice.actions;
export default productSlice.reducer;
