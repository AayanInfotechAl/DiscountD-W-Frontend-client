// features/cart/cartSlice.js or wherever appropriate
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk(
  "cart/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://www.discountdoorandwindow.com/api/address", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, 'response.data');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
