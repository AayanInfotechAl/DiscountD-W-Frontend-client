import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  Fab,
} from "@mui/material";
import banner from "../../assets/doors.png";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../../loader/Loader";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const token = Cookies.get("alanAuthToken");
  const userLoggedInId = Cookies.get("userLoggedInId");

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

  const fetchAllOrderHistory = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.discountdoorandwindow.com/api/FnalCustData/orderHistory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status === 200) {
        setOrderHistory(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrderHistory();
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="doors-container px-3 mb-4">
          <Box
            sx={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h2" className="text-black fw-bold">
                Orders
              </Typography>
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>

          <Container className="mt-4">
            <Typography variant="h4" gutterBottom className="fw-bold mb-3">
              Total Orders&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
              <Fab
                color="primary"
                size="small"
                className="fw-bold"
              >
                {orderHistory?.length > 0 ? orderHistory.length : 0}
              </Fab>
            </Typography>
            {/* {orderHistory?.map((order, index) => ( */}
            {orderHistory && orderHistory.length > 0 ? (
              orderHistory.map((order, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography component="span">
                      Order #{order.order_id} - {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Box mb={2}>
                          <Typography variant="h6">Product Details</Typography>
                          <Divider />
                          <Box mt={1}>
                            <Typography>
                              <strong>Product Name:</strong> {order.orderData.product_name}
                            </Typography>
                            <Typography>
                              <strong>SKU:</strong> {order.orderData.product_sku}
                            </Typography>
                            <Typography>
                              <strong>Price:</strong> ${order.orderData.product_price.toFixed(2)}
                            </Typography>
                            <Typography>
                              <strong>Total Price:</strong> ${order.amount.toFixed(2)}
                            </Typography>
                            <Typography>
                              <strong>Selected Options:</strong>
                            </Typography>
                            {order.orderData.selected_options &&
                              Object.entries(order.orderData.selected_options).map(
                                ([key, value]) => (
                                  <Typography key={key}>
                                    {key}: {typeof value === "object" ? JSON.stringify(value) : value}
                                  </Typography>
                                )
                              )
                            }
                          </Box>
                        </Box>
                      </Grid>

                      {/* Customer Details Column */}
                      <Grid item xs={12} md={4}>
                        <Box mb={2}>
                          <Typography variant="h6">Customer Details</Typography>
                          <Divider />
                          <Box mt={1}>
                            <Typography>
                              <strong>Name:</strong> {order.customerDetails.name}
                            </Typography>
                            <Typography>
                              <strong>Email:</strong> {order.customerDetails.email}
                            </Typography>
                            <Typography>
                              <strong>Mobile:</strong> {order.customerDetails.mobile}
                            </Typography>
                            <Typography>
                              <strong>Address:</strong> {order.customerDetails.address}
                            </Typography>
                            <Typography>
                              <strong>State:</strong> {order.customerDetails.state}
                            </Typography>
                            <Typography>
                              <strong>Zip Code:</strong> {order.customerDetails.zipCode}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Payment Details Column */}
                      <Grid item xs={12} md={4}>
                        <Box mb={2}>
                          <Typography variant="h6">Payment Details</Typography>
                          <Divider />
                          <Box mt={1}>
                            <Typography>
                              <strong>Payment ID:</strong> {order.paymentId}
                            </Typography>
                            <Typography
                              style={{
                                color: order.status === "pending" ? "red" :
                                  order.status === "succeeded" ? "green" : "black",
                              }}
                            >
                              <strong>Payment Status: {order.status}</strong>
                            </Typography>
                            <Typography
                              style={{
                                color:
                                  order.orderStatus === "pending" || order.orderStatus === "Cancelled"
                                    ? "red"
                                    : order.orderStatus === "succeeded"
                                      ? "green"
                                      : "black",
                              }}
                            >
                              <strong>Order Status: {order.orderStatus}</strong>
                            </Typography>

                            {order?.payer && (
                              <>
                                <Divider />
                                <Typography>
                                  <strong>Payer Name:</strong> {order.payer.name || "N/A"}
                                </Typography>
                                <Typography>
                                  <strong>Email:</strong> {order.payer.email || "N/A"}
                                </Typography>
                                <Typography>
                                  <strong>Card Brand:</strong> {order.payer.card?.brand || "N/A"}
                                </Typography>
                                <Typography>
                                  <strong>Last 4 Digits:</strong> {order.payer.card?.number || "N/A"}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Box mt={4} textAlign="center">
                <Typography variant="h6" color="textSecondary">
                  You have not placed any orders yet.
                </Typography>
              </Box>
            )}
            {/* ))} */}
          </Container>
        </div >
      )}
    </>
  );
};

export default OrderHistory;
