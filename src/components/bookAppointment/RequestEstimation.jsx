import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RequestEstimation = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.mobileNo) newErrors.mobileNo = "Mobile number is required";
    if (!formValues.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      ...formValues,
      type: "Get Estimates",
    };

    try {
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/contacts",
        payload
      );

      if (response.data.success) {
        toast.success(response.data.message || "Estimate request sent!", { autoClose: 1000 });
        setFormValues({
          name: "",
          email: "",
          mobileNo: "",
          message: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Bad request", { autoClose: 1000 });
      } else {
        toast.error("Failed to request estimate. Please try again.");
      }
    }
  };

  return (
    <div className="mb-4">
      <Container maxWidth="sm">
        <Box className="mt-4">
          <Grid container spacing={2} className="mt-4">
            <Grid item xs={12}>
              <Box className="mb-3">
                <InputLabel className="fw-bold mb-2 text-black">Your Name</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Your name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="mb-3">
                <InputLabel className="fw-bold mb-2 text-black">Email Address</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Email Address"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="mb-3">
                <InputLabel className="fw-bold mb-2 text-black">Mobile No.</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Mobile No"
                    name="mobileNo"
                    value={formValues.mobileNo}
                    onChange={handleInputChange}
                    error={!!errors.mobileNo}
                    helperText={errors.mobileNo}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="mb-3">
                <InputLabel className="fw-bold mb-2 text-black">Message</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    name="message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center" }} className="mt-3">
            <Button
              variant="contained"
              className="me-3"
              sx={{ backgroundColor: "#0068B3" }}
              onClick={handleSubmit}
            >
              Request Free Estimate
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};
