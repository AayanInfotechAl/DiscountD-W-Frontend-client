import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import banner from "../../assets/doors.png";
import card_img1 from "../../assets/window.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeIcon from "@mui/icons-material/Mode";
import {
  deleteProduct,
  fetchAllProducts,
  updateUserBillingAddress,
} from "../redux/slices/addToCartSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "../../loader/Loader";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import { fetchAddress } from "../redux/slices/addressSlice";

// const pickupAddressOptions = [
//   {
//     id: "option3",
//     title: "Door and Window",
//     description: [
//       "Discount Door and Window",
//       "5450 Complex St.",
//       "Unit 301",
//       "San Diego, CA 92123",
//     ],
//     price: "$440",
//   },
// ];

const Cart = () => {
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    mobile: "",
    state: "",
    zipCode: "",
    address: "",
  });
  const [productQuantities, setProductQuantities] = useState({});
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const { data } = useSelector((state) => state.address);
  const getAddressDetails = data?.data || [];

  const pickupAddressOptions = getAddressDetails.map((item, index) => ({
    id: item._id || `option-${index}`,
    title: "Door and Window", // or item.name if available
    description: [
      `Business Name: Discount Door and Window`,
      `Street: ${item.street}`,
      `Suite: ${item.suite}`,
      `City: ${item.city}`,
      `State: ${item.state}`,
      `ZIP: ${item.zip}`,
      `Phone: ${item.phone}`,
    ],
    price: "$440",
  }));


  const userLoggedInId = Cookies.get("userLoggedInId");
  const alanAuthToken = Cookies.get("alanAuthToken");
  const navigate = useNavigate();
  const location = useLocation();

  const calculateTotalPrice = Array.isArray(products?.orders)
    ? products?.orders.reduce((acc, product) => {
      const quantity = productQuantities[product._id] || 1;
      return acc + product.totalPrice * quantity;
    }, 0)
    : 0;

  const numberOfTotalProducts = Array.isArray(products?.orders)
    ? products?.orders.length
    : 0;

  const fetchCustomerAddressDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/CustMng/customers/${userLoggedInId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alanAuthToken}`,
          },
        }
      );
      setCustomerDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userLoggedInId || !alanAuthToken) {
      if (!products?.orders || products?.orders.length === 0) {
        dispatch(fetchAllProducts());
      }
    } else {
      if (!products?.orders || products?.orders.length === 0) {
        dispatch(fetchAllProducts());
      }
      fetchCustomerAddressDetails();
    }
  }, [dispatch, products]);

  const handleQuantityChange = (productId, operation) => {
    setProductQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity =
        operation === "increment"
          ? currentQuantity + 1
          : currentQuantity > 1
            ? currentQuantity - 1
            : 1;

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleEditCustomerAddress = () => {
    const customer = customerDetails;
    if (customer) {
      setBillingDetails({
        name: customer.name || "",
        mobile: customer.mobile || "",
        state: customer.state || "",
        zipCode: customer.zipCode || "",
        address: customer.address || "",
      });
      setIsEditingBilling(true);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await dispatch(deleteProduct(productToDelete)).unwrap();
      dispatch(fetchAllProducts());
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setProductToDelete(null);
  };

  const handleUpdateBillingDetails = async (e) => {
    e.preventDefault();
    if (
      !billingDetails.name ||
      !billingDetails.mobile ||
      !billingDetails.state ||
      !billingDetails.zipCode ||
      !billingDetails.address
    ) {
      toast.error("Please fill out all fields before updating.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      updateUserBillingAddress({ userId: userLoggedInId, billingDetails })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Customer updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setBillingDetails({
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        dispatch(fetchAllProducts())
          .unwrap()
          .then(() => {
            toast.success("Products updated successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          })
          .catch((error) => {
            toast.error(
              `Failed to fetch products: ${error || "Unknown error"}`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
          });
      })
      .catch((error) => {
        toast.error(`Update failed: ${error || "Unknown error"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const handleCancelBillingDetails = () => {
    setBillingDetails({
      name: "",
      mobile: "",
      state: "",
      zipCode: "",
      address: "",
    });
    setIsEditingBilling(false);
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (!alanAuthToken && !userLoggedInId) {
      alert("Please log in before proceeding to checkout.");
      navigate("/login");
      return;
    }
    if (!products?.orders || products?.orders.length === 0) {
      alert("Your cart is empty. Please add some products before checkout.");
      return;
    }
    if (!shippingMethod) {
      alert("Please select a shipping method before proceeding.");
      return;
    }
    let shippingAddress = {};
    if (shippingMethod === "pickup") {
      if (!selectedOption) {
        alert("Please select a pickup address before proceeding.");
        return;
      }
      const selectedPickupOption = pickupAddressOptions.find(
        (option) => option.id === selectedOption
      );
      if (!selectedPickupOption) {
        alert("Invalid pickup address selected.");
        return;
      }
      shippingAddress = {
        title: selectedPickupOption.title,
        description: selectedPickupOption.description.join(", "),
      };
    } else if (shippingMethod === "delivery") {
      if (!selectedOption || !customerDetails) {
        alert("Please select a delivery address before proceeding.");
        return;
      }
      shippingAddress = {
        name: customerDetails.name || "N/A",
        mobile: customerDetails.mobile || "N/A",
        email: customerDetails.email || "N/A",
        address: customerDetails.address || "N/A",
        state: customerDetails.state || "N/A",
        zipCode: customerDetails.zipCode || "N/A",
      };
    }
    const checkoutData = {
      totalPrice: calculateTotalPrice.toFixed(2),
      totalProducts: numberOfTotalProducts,
      shippingMethod: shippingMethod,
      shippingAddress,
      products: products?.orders?.map((product) => ({
        dish: product.name,
        imgdata: product.images,
        price: product.product_price,
      })),
      productIds: products?.orders?.map((product) => product._id),
    };
    try {
      setIsProcessing(true);
      const stripe = await loadStripe(
        "pk_test_51QoJ7kAVVqxB4pCghu988pszHfcMWzKLIvG1vwatgYt7tUwSMvf7Pj0xfGktagXmZvQ0zdEkctDSvaYB0l7ufnyn0084s9ErDf"
      );
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/payment/create-payment-intent",
        { checkoutData },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${alanAuthToken}` } }
      );
      const session = response.data;
      if (!session.sessionId) {
        throw new Error("Invalid session ID from backend.");
      }
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      if (result.error) {
        console.log(result.error, "error-----");
      }
    } catch (error) {
      alert("Checkout failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <div className="doors-container mb-4">
            <Box sx={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", }}>
              <Box>
                <Typography variant="h2" className="text-black fw-bold">
                  Cart
                </Typography>
                <Typography variant="h6" className="text-black fw-bold">
                  <span>
                    Home {">"} {formatPath(location.pathname)}
                  </span>
                </Typography>
              </Box>
            </Box>

            <Container maxWidth="false" className="mt-4">
              {loading ? (
                <div className="text-center">
                  <CircularProgress color="primary" />
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <div className="text-center">
                  <p className="text-black mb-0">{error}</p>
                  <img
                    height="200px" width="200px"
                    src="https://static.vecteezy.com/system/resources/previews/016/026/442/non_2x/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                    alt="Empty Cart"
                  />
                  <p className="text-muted">
                    Looks like you haven’t added anything to your cart yet. Start shopping and come back here to review your items.
                  </p>
                </div>
              ) : products?.orders?.length > 0 ? (
                products.orders.map((product, index) => (
                  <div className="card mb-2" key={product._id}>
                    <div className="card-body">
                      <div className="row gx-4 align-items-center">
                        <div className="col-12 col-sm-4 col-md-4 mb-3 mb-md-0">
                          <div className="d-flex align-items-center">
                            <img src={product?.images?.[0] || card_img1} alt="Product" className="me-2" onError={(e) => e.target.src = No_Image_Available} style={{ height: "80px", width: "100px" }} />
                            <div>
                              <p className="mb-0">  {product?.name ? product?.name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-sm-4 col-md-2 mb-2 mb-md-0">
                          <div className="text-start text-md-center">
                            Price:&nbsp;
                            <span>
                              ${((product?.totalPrice || 0) * (productQuantities[product._id] || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-sm-8 col-md d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-between justify-content-md-start align-items-center">
                            Quantity:
                            <IconButton onClick={() => handleQuantityChange(product._id, "decrement")}>
                              <RemoveCircleOutlineIcon sx={{ color: "black" }} />
                            </IconButton>
                            <Typography className="p-2 border border-2 rounded-1 text-center" sx={{ height: "30px", minWidth: "40px", display: "flex", alignItems: "center", justifyContent: "center", }}>
                              {productQuantities[product._id] || 1}
                            </Typography>
                            <IconButton onClick={() => handleQuantityChange(product._id, "increment")}>
                              <ControlPointIcon sx={{ color: "black" }} />
                            </IconButton>
                          </div>
                        </div>
                        <div className="col-6 col-sm-4 col-md-1 d-flex justify-content-center">
                          <IconButton color="primary" size="small" onClick={() => handleOpenDeleteDialog(product._id)} sx={{ border: "1px solid #fc5f03" }}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center fw-bold mt-4">
                  <img
                    height="200px" width="200px"
                    src="https://static.vecteezy.com/system/resources/previews/016/026/442/non_2x/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                    alt="Empty Cart"
                  />
                </p>
              )}
              <Dialog open={Boolean(productToDelete)} onClose={handleDeleteCancel} maxWidth="sm" fullWidth={true}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <Alert variant="outlined" severity="error">
                    Are you sure you want to delete this product..?
                  </Alert>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteCancel} color="primary">
                    Cancel
                  </Button>
                  <Button variant="outlined" size="small" onClick={handleDeleteConfirm} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="row gx-3 gy-3">
                {alanAuthToken && userLoggedInId && (
                  <>
                    <div className="col-12 col-md-4">
                      <div className={`p-2 border border-1 rounded ${!isEditingBilling ? "bg-light" : ""}`}>
                        <h6 className="fw-bold">Billing</h6>
                        <form className="form" disabled={!isEditingBilling} style={{ outline: "none", boxShadow: "none", pointerEvents: isEditingBilling ? "auto" : "none", }}>
                          <div className="mb-3">
                            <input type="text" name="name" placeholder="First Name" value={billingDetails.name} onChange={handleBillingChange} className="form-control" style={{ outline: "none", boxShadow: "none" }} />
                          </div>
                          <div className="mb-3">
                            <input type="text" name="mobile" placeholder="Mobile Number" value={billingDetails.mobile} onChange={handleBillingChange} className="form-control" style={{ outline: "none", boxShadow: "none" }} />
                          </div>
                          <div className="mb-3">
                            <input type="text" name="state" placeholder="State" value={billingDetails.state} onChange={handleBillingChange} className="form-control" style={{ outline: "none", boxShadow: "none" }} />
                          </div>
                          <div className="mb-3">
                            <input type="text" name="zipCode" placeholder="Zip Code" value={billingDetails.zipCode} onChange={handleBillingChange} className="form-control" style={{ outline: "none", boxShadow: "none" }} />
                          </div>
                          <div className="mb-3">
                            <textarea name="address" placeholder="Address" value={billingDetails.address} onChange={handleBillingChange} className="form-control" style={{ outline: "none", boxShadow: "none" }} />
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateBillingDetails}>
                              Update
                            </button>
                            <button type="submit" className="btn btn-primary" onClick={handleCancelBillingDetails}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="p-2 border border-1 rounded">
                        <h6 className="fw-bold">Shipping Method</h6>
                        <div className="d-flex align-items-center mb-3">
                          <div className="form-check me-4">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={shippingMethod === "delivery"} onChange={() => setShippingMethod("delivery")} />
                            <label className="form-check-label" for="flexRadioDefault1">
                              Delivery
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={shippingMethod === "pickup"} onChange={() => setShippingMethod("pickup")} />
                            <label className="form-check-label" for="flexRadioDefault2">
                              Pickup
                            </label>
                          </div>
                        </div>
                        {shippingMethod === "pickup" && (
                          <div>
                            {pickupAddressOptions?.map((option) => (
                              <div key={option.id} className="p-2 border border-1 rounded mb-2 d-flex align-items-start">
                                <input type="radio" id={option.id} name="pickupOption" value={option.id} className="me-2" checked={selectedOption === option.id} onChange={handleChange} />
                                <label htmlFor={option.id} className="w-100 d-flex justify-content-between">
                                  <div>
                                    <h6 className="fw-bold">{option.title}</h6>
                                    {option.description.map((line, index) => (
                                      <p key={index} className="mb-0">
                                        &nbsp;-&nbsp;{line}
                                      </p>
                                    ))}
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {shippingMethod === "delivery" && customerDetails && (
                          <div className="p-2 border border-1 rounded mb-2 d-flex align-items-start">
                            <input type="radio" id="option3" name="pickupOption" value={customerDetails?._id} checked={selectedOption === customerDetails._id} onChange={() => setSelectedOption(customerDetails._id)} className="me-2" />
                            <label
                              htmlFor="option3"
                              className="w-100 d-flex justify-content-between"
                            >
                              <div>
                                <h6 className="fw-bold">
                                  &nbsp;&nbsp;{customerDetails?.name || "n/a"}
                                </h6>
                                <p className="mb-0">
                                  &nbsp;-&nbsp;
                                  {customerDetails?.email || "N/A"}
                                </p>
                                <p className="mb-0">
                                  &nbsp;-&nbsp;
                                  {customerDetails?.mobile || "N/A"}
                                </p>
                                <p className="mb-0">
                                  &nbsp;-&nbsp;
                                  {customerDetails?.state || "N/A"}
                                </p>
                                <p className="mb-0">
                                  &nbsp;-&nbsp;
                                  {customerDetails?.address || "N/A"}
                                </p>
                                <p className="mb-0">
                                  &nbsp;-&nbsp;
                                  {customerDetails?.zipCode || "N/A"}
                                </p>
                              </div>
                              <IconButton
                                onClick={handleEditCustomerAddress}
                                variant="outlined"
                                sx={{ height: "40px", width: "40px" }}
                              >
                                <ModeIcon color="primary" />
                              </IconButton>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="col-12 col-md-4 mt-3">
                  <div className="p-2 border border-1 rounded">
                    <h6 className="fw-bold">Product Details</h6>
                    {products?.orders?.length > 0 ? (
                      products?.orders.map((product, index) => (
                        <Accordion key={product._id}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                            <Typography component="span">
                              {product.name}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div>
                              <h6 className="fw-bold mb-3">Selected Options</h6>
                              {product.selectedOptions ? (
                                Object.entries(product.selectedOptions).map(
                                  ([key, value]) => (
                                    <div key={key} className="d-flex justify-content-between align-items-center mb-2">
                                      <h6 className="">{key}</h6>
                                      <p className="mb-0">{value}</p>
                                    </div>
                                  )
                                )
                              ) : (
                                <p>No options selected</p>
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    ) : (
                      <p className="text-center mt-3">No product in the cart</p>
                    )}
                    <hr />
                    <div className="summary border border-1 rounded p-3">
                      <h4>Summary</h4>
                      <div className="d-flex justify-content-between">
                        <span>Total Products:</span>
                        <span className="fw-bold">{numberOfTotalProducts}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Total Price:</span>
                        <span className="fw-bold">
                          ${calculateTotalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {products?.orders?.length > 0 && (
                <Box className="text-center mt-4">
                  <Button variant="contained" onClick={handleCheckOut} sx={{ p: 1, backgroundColor: "#FC5F03", borderColor: "#FC5F03", textTransform: "none", width: "150px", }} className="rounded-3 fw-bold" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Check Out"}
                  </Button>
                </Box>
              )}
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;