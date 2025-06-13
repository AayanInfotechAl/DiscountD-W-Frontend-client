import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const VerifyPassword = () => {
  const [otpData, setOtpData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, otp, newPassword, confirmPassword } = otpData;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!otp) {
      newErrors.otp = "OTP is required.";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/CustMng/verifyForgetPasswordOTP",
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200 && response.data.success === true) {
        toast.success("Password changed successfully!");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);

      const apiMessage =
        error.response?.data?.message || "An unexpected error occurred.";

      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: apiMessage,
      }));

      toast.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <Container
        sx={{
          mt: { xs: 3, md: 5 },
          mb: 4,
          maxWidth: { xs: "100%", sm: "600px", md: "1000px" },
        }}
      >
        <form onSubmit={handleVerifyOTP}>
          <div className="row gx-5">
            <div className="col-12 col-md-6">
              <Box sx={{ mb: 3 }}>
                <InputLabel
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: "bold",
                  }}
                >
                  OTP
                </InputLabel>
                <TextField
                  name="otp"
                  variant="outlined"
                  placeholder="Enter OTP"
                  value={otpData.otp}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.otp && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.otp}
                  </Typography>
                )}
              </Box>
            </div>
            <div className="col-12 col-md-6">
              <Box sx={{ mb: 3 }}>
                <InputLabel
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: "bold",
                  }}
                >
                  Email
                </InputLabel>
                <TextField
                  name="email"
                  variant="outlined"
                  placeholder="Enter Registered Email"
                  value={otpData.email}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.email && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.email}
                  </Typography>
                )}
              </Box>
            </div>
            <div className="col-12 col-md-6">
              <Box sx={{ mb: 3 }}>
                <InputLabel
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: "bold",
                  }}
                >
                  New Password
                </InputLabel>
                <TextField
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  placeholder="Enter New Password"
                  value={otpData.newPassword}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    "& fieldset": { border: "none" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.newPassword && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.newPassword}
                  </Typography>
                )}
              </Box>
            </div>
            <div className="col-12 col-md-6">
              <Box sx={{ mb: 3 }}>
                <InputLabel
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: "bold",
                  }}
                >
                  Confirm Password
                </InputLabel>

                <TextField
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  placeholder="Confirm New Password"
                  value={otpData.confirmPassword}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    "& fieldset": { border: "none" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.confirmPassword && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.confirmPassword}
                  </Typography>
                )}
              </Box>
            </div>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  backgroundColor: "#1C4E9B",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Change Password"}
              </Button>
            </Box>
          </div>
        </form>
      </Container>
    </div>
  );
};
