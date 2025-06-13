import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    full_name: "",
    email: "",
    password: "",
    mobile_number: "",
    address: "",
    state: "",
    zipCode: "",
  });
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedOptions.full_name)
      newErrors.full_name = "Full name is required";
    if (!selectedOptions.password) newErrors.password = "Full name is required";
    if (!selectedOptions.email || !/\S+@\S+\.\S+/.test(selectedOptions.email))
      newErrors.email = "Valid email is required";
    if (
      !selectedOptions.mobile_number ||
      !/^\d{10}$/.test(selectedOptions.mobile_number)
    )
      newErrors.mobile_number = "Mobile number must be 10 digits";
    if (!selectedOptions.address) newErrors.address = "Address is required";
    if (!selectedOptions.password) newErrors.password = "Password is required";
    if (!selectedOptions.state) newErrors.state = "State is required";
    if (!selectedOptions.zipCode || !/^\d{5}$/.test(selectedOptions.zipCode))
      newErrors.zipCode = "Zip code must be 5 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setBtnLoader(true);
    try {
      const payload = {
        name: selectedOptions.full_name,
        email: selectedOptions.email,
        password: selectedOptions.password,
        mobile: selectedOptions.mobile_number,
        address: selectedOptions.address,
        state: selectedOptions.state,
        zipCode: selectedOptions.zipCode,
      };

      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/CustMng/custCreate",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setSubmittedEmail(selectedOptions.email);
        toast.success("Profile created successfully!");
        setOpenOtpModal(true);
        setSelectedOptions({
          full_name: "",
          email: "",
          password: "",
          mobile_number: "",
          address: "",
          state: "",
          zipCode: "",
        });
      } else {
        toast.error(response.data.message || "Failed to create profile.");
      }
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
      setSnackbarMessage(error.response?.data?.message || "An error occurred.");
      setOpenSnackbar(true);
    } finally {
      setBtnLoader(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      const payload = {
        email: submittedEmail,
        otp,
      };
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/CustMng/otpVerify",
        payload
      );
      if (response.data.success) {
        const successMessage =
          response.data.message || "OTP verified successfully!";
        toast.success(successMessage);
        setSnackbarMessage(successMessage);
        setOpenSnackbar(true);
        setOpenOtpModal(false);
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="doors-container">
      <Container className="mt-4 d-flex justify-content-center align-items-center mb-4">
        <Grid container spacing={2} sx={{ width: { xs: "100%", md: "75%" }, }}>
          <Grid item xs={12} sm={6} md={6}>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">
                Full Name
              </InputLabel>
              <FormControl fullWidth error={Boolean(errors.full_name)}>
                <TextField
                  name="full_name"
                  value={selectedOptions.full_name}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter Full Name"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.full_name && (
                  <FormHelperText error>{errors.full_name}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">Email</InputLabel>
              <FormControl fullWidth error={Boolean(errors.email)}>
                <TextField
                  name="email"
                  value={selectedOptions.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter Email"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">
                Password
              </InputLabel>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <TextField
                  name="password"
                  type="password"
                  value={selectedOptions.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter Password"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">
                Zip Code
              </InputLabel>
              <FormControl fullWidth error={Boolean(errors.zipCode)}>
                <TextField
                  name="zipCode"
                  value={selectedOptions.zipCode}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Zip Code"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.zipCode && (
                  <FormHelperText error>{errors.zipCode}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">
                Mobile No.
              </InputLabel>
              <FormControl fullWidth error={Boolean(errors.mobile_number)}>
                <TextField
                  name="mobile_number"
                  type="number"
                  value={selectedOptions.mobile_number}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Mobile No."
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.mobile_number && (
                  <FormHelperText error>{errors.mobile_number}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">
                Address
              </InputLabel>
              <FormControl fullWidth error={Boolean(errors.address)}>
                <TextField
                  name="address"
                  value={selectedOptions.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter Address"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.address && (
                  <FormHelperText error>{errors.address}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="mb-3">
              <InputLabel className="fw-bold text-black mb-2">State</InputLabel>
              <FormControl fullWidth error={Boolean(errors.state)}>
                <TextField
                  name="state"
                  value={selectedOptions.state}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="State"
                  sx={{
                    backgroundColor: "#D0E5F4",
                    borderRadius: "10px",
                    border: "none",
                    "& fieldset": { border: "none" },
                  }}
                />
                {errors.state && (
                  <FormHelperText error>{errors.state}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box sx={{ mt: 5 }}>
              <Button
                variant="contained"
                className="w-100 p-2 fw-bold"
                onClick={handleSubmit}
                sx={{ textTransform: "none" }}
              >
                {btnLoader ? (
                  <span>
                    <i className="fa-solid fa-spinner"></i>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        aria-labelledby="otp-modal-title"
        aria-describedby="otp-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "500px",
            height: "300px",
            textAlign: "center",
          }}
        >
          <h4 className="mb-3">Enter OTP</h4>
          <p className="mb-3">Email: {submittedEmail}</p>
          <FormControl fullWidth>
            <TextField
              name="otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              variant="outlined"
              placeholder="Enter OTP"
              sx={{
                backgroundColor: "#D0E5F4",
                borderRadius: "10px",
                border: "none",
                "& fieldset": { border: "none" },
              }}
            />
          </FormControl>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              className="w-100"
              sx={{ textTransform: "none" }}
              onClick={handleOtpSubmit}
            >
              Submit OTP
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
