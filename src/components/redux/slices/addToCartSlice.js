import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const addtocartproduct = createAsyncThunk(
  "cart/addtocartproduct",
  async (productDetails, { rejectWithValue }) => {
    try {
      const token = Cookies.get("alanAuthToken");
      const userLoggedInId = Cookies.get("userLoggedInId");
      const sessionId = Cookies.get("sessionId");
      let apiUrl = "";
      let headers = {
        "Content-Type": "application/json",
      };
      if (token && userLoggedInId) {
        apiUrl = "https://www.discountdoorandwindow.com/api/order/create-order";
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        if (!sessionId) {
          throw new Error("Session ID is missing");
        }
        apiUrl = "https://www.discountdoorandwindow.com/api/GMCards/sessions";
      }
      const response = await axios.post(apiUrl, productDetails, { headers });
      console.log(response, 'reduct response');
      return {
        ...response.data,
        message: response.data?.message || "Item added to cart",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to the cart"
      );
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "cart/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("alanAuthToken");
      const userLoggedInId = Cookies.get("userLoggedInId");
      const sessionId = Cookies.get("sessionId");
      let apiUrl = "";
      let headers = {
        "Content-Type": "application/json",
      };
      if (token && userLoggedInId) {
        apiUrl = "https://www.discountdoorandwindow.com/api/order/orders";
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        if (!sessionId) {
          throw new Error("Session ID is missing");
        }
        apiUrl = `https://www.discountdoorandwindow.com/api/GMCards/sessions/${sessionId}`;
      }
      const response = await axios.get(apiUrl, {
        headers: headers,
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("alanAuthToken");
      const userLoggedInId = Cookies.get("userLoggedInId");
      let apiUrl = "";
      let headers = {
        "Content-Type": "application/json",
      };
      if (token && userLoggedInId) {
        apiUrl = `https://www.discountdoorandwindow.com/api/order/orders/${productId}`;
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        apiUrl = `https://www.discountdoorandwindow.com/api/GMCards/sessions/${productId}`;
      }

      const response = await axios.delete(apiUrl, { headers });

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

export const updateUserBillingAddress = createAsyncThunk(
  "cart/updateUserBillingAddress",
  async ({ userId, billingDetails }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("alanAuthToken");
      const response = await axios.put(
        `https://www.discountdoorandwindow.com/api/CustMng/customers/${userId}`,
        billingDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update billing details"
      );
    }
  }
);

// Define the slice
const addToCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    products: [],
    billingDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.products = [];
      state.billingDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addtocartproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtocartproduct.fulfilled, (state, action) => {
        state.loading = false;
        const order = action.payload?.order;
        if (order) {
          if (!state.products?.orders) {
            state.products = { orders: [], customer: null, productCount: 0 };
          }
          state.products.orders.push(order);
          state.products.productCount = state.products.orders.length;
        }
      })

      .addCase(addtocartproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all products reducers
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (state.products?.orders) {
          state.products.orders = state.products.orders.filter(
            (product) => product._id !== action.payload
          );
        }
        state.products.productCount = state.products.orders?.length || 0;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update billing address
      .addCase(updateUserBillingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserBillingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.billingDetails = action.payload;
      })
      .addCase(updateUserBillingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
