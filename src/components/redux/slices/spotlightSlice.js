import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../apiUtils.js";

export const addToCart = createAsyncThunk(
  "spotlight/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl(`api/cart/doors/add-cart`), {
        productId,
        quantity,
      }, {
        headers: {
            'Content-Type': 'application/json', 
          }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const spotlightSlice = createSlice({
  name: "spotlight",
  initialState: {
    spotlight: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Update the state or log the response if necessary
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default spotlightSlice.reducer;
