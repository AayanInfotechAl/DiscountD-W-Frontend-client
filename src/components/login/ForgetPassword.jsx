import {
    Box,
    Button,
    Container,
    InputLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  
  export const ForgetPassword = () => {
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleForgetPassword = async (e) => {
      e.preventDefault();
  
      if (!forgotPasswordEmail) {
        toast.error("Please enter your email address.");
        return;
      }
      if (!validateEmail(forgotPasswordEmail)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(
          "https://www.discountdoorandwindow.com/api/CustMng/forgetPassword",
          { email: forgotPasswordEmail },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        if (response.data.status === 200 && response.data.success === true) {
          toast.success("OTP sent to your email successfully");
          navigate("/verifyotp");
        } else {
          toast.error(response.data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <Container
          sx={{
            mt: { xs: 3, md: 5 },
            mb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "80%", md: "400px" } }}>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" }, fontWeight: "bold" }}
            >
              Forget Password
            </Typography>
            <Box sx={{ mt: 4 }}>
              <InputLabel
                sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: "bold" }}
              >
                Email
              </InputLabel>
              <TextField
                variant="outlined"
                placeholder="Enter Registered Email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                sx={{
                  width: "100%",
                  backgroundColor: "#D0E5F4",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "center",
                  },
                  "& fieldset": {
                    border: "none",
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#1C4E9B",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  width: "100%",
                }}
                onClick={handleForgetPassword}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    );
  };
  