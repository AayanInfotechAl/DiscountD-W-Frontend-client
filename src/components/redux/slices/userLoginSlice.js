import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/CustMng/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        return {
          token: response.data.token,
          customerId: response.data.customer.id,
          message: response.data.message,
        };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userLoginSlice = createSlice({
  name: "user_login",
  initialState: {
    loginDetails: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginDetails = action.payload;
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userLoginSlice.reducer;
