import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import successfully from "../../assets/successfully.png";
import { Link, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export const Successfully = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const token = Cookies.get("alanAuthToken");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (!session_id) {
          return;
        }
        const response = await axios.get(
          `https://www.discountdoorandwindow.com/api/payment/completePayment?session_id=${session_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchPaymentDetails();
  }, [session_id, token]);


  return (
    <div>
      <Box sx={{ mt: 5, mb: 4 }}>
        <Typography variant="h4" align="center" className="fw-bold text-black">
          Payment Successful
        </Typography>
        <Box className="text-center">
          <img src={successfully} height={150} />
        </Box>
        <Typography variant="h4" align="center" className="fw-bold text-black">
          Your Payment have been successful!
        </Typography>
        <Box className="text-center mt-3">
          <Link to="/order-history">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "150px" }}
              className="fw-bold text-capitalize me-2"
            >
              Orders
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};
