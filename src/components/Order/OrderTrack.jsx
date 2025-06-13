import {
  Box,
  Button,
  Container,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  StepConnector
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

const statusSteps = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "calcelled",
];

export const OrderTrack = () => {
  const [orderInput, setOrderInput] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = Cookies.get("alanAuthToken");

  const handleInputChange = (e) => {
    setOrderInput(e.target.value);
  };

  const handleOrderTrack = async () => {
    if (!orderInput) {
      setError("Please enter a valid tracking order ID.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/FnalCustData/order-tracking/${orderInput}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        setOrderStatus(response?.data?.data);
        setSuccess(response?.data?.message || "Order retrieved successfully.");
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch order status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = () => {
    if (!orderStatus) return -1;
    return statusSteps.findIndex(
      (status) => status.toLowerCase() === orderStatus.orderStatus.toLowerCase()
    );
  };

  const CustomStepConnector = ({ activeStep }) => (
    <StepConnector
      sx={{
        "& .MuiStepConnector-line": {
          borderColor: activeStep === statusSteps.length - 1 && statusSteps[activeStep] === "calcelled"
            ? "red"
            : "green",
        },
      }}
    />
  );

  const handleReset = () => {
    setOrderInput("");
    setOrderStatus(null);
    setError(null);
    setSuccess(null);
  };


  return (
    <div>
      <Container
        sx={{
          mt: { xs: 2, md: 5 },
          mb: { xs: 3, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "1.8rem", md: "2.2rem" } }}
          >
            Track Your Order
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 1, color: "black", fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            For tracking the order, you need to enter your Order ID.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <InputLabel sx={{ color: "black", fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }}>
              Order ID
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Order ID"
              fullWidth
              value={orderInput}
              onChange={handleInputChange}
              sx={{
                mt: 1,
                backgroundColor: "#D0E5F4",
                borderRadius: "10px",
                "& fieldset": { border: "none" },
              }}
            />
            {error && <Typography color="error" className="my-2">{error}</Typography>}
            {success && <Typography color="green" className="my-2">{success}</Typography>}
          </Box>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={handleOrderTrack}
              className="me-3"
            >
              {loading ? "Tracking your order..." : "Track Order"}
            </Button>
            {orderStatus && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleReset}
              >
                {loading ? "Tracking your order..." : "Reset"}
              </Button>
            )}
          </Box>
        </Box>
      </Container>

      {/* Show Order Tracking details only if order is tracked */}
      {orderStatus && (
        <Container sx={{ mt: 5, mb: 4 }}>
          <Box className="mb-3">
            <Typography variant="h4" align="center" className="fw-bold text-black">
              Order ID: {orderStatus?.order_id || "N/A"}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              className="mt-2"
            >
              <Typography align="center" className="fw-bold me-4 text-black">
                <Typography component="span" color="text.secondary">
                  Order date:
                </Typography>{" "}
                {new Date(orderStatus.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </Typography>
            </Box>
          </Box>

          {/* Stepper for Order Tracking */}
          <Box sx={{ width: "100%", textAlign: "center", mt: 1 }}>
            <Stepper activeStep={getActiveStep()} alternativeLabel connector={<CustomStepConnector activeStep={getActiveStep()} />}>
              {statusSteps.map((status, index) => (
                <Step key={status}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        "&.Mui-active": { color: "blue" },
                        "&.Mui-completed": { color: "green" },
                        "&.Mui-error": { color: "red" },
                      },
                    }}
                    sx={{
                      flexDirection: "column",
                      alignItems: "center",
                      "& .MuiStepLabel-label": {
                        fontWeight: "bold",
                        color: index <= getActiveStep() ? "#FC5F03" : "gray",
                        marginBottom: "4px",
                      },
                    }}
                  >
                    <Typography variant="body1" className="fw-bold">{status}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default OrderTrack;
