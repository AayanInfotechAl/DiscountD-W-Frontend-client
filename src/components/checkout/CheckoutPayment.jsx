import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import debit_card from "../../assets/debitCard.png";
import { Link } from "react-router-dom";

export const CheckoutPayment = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    termsChecked: false,
    saveDetails: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <Container sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h3" align="center" className="fw-bold text-black">
          Checkout
        </Typography>
        <Grid container spacing={3} mt={3} justifyContent="center">
          <Grid item xs={12} sm={6} className="text-center">
            <img src={debit_card} height={300} />
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel className="text-black">Card Name</InputLabel>
                <TextField
                  name="cardName"
                  fullWidth
                  variant="outlined"
                  value={formData.cardName}
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: "50px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#FC5F03",
                    },
                    "&:hover .MuiOutlinedInput-root fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset":
                      { borderColor: "#FC5F03" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="text-black">Card Number</InputLabel>
                <TextField
                  name="cardNumber"
                  fullWidth
                  variant="outlined"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: "50px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#FC5F03",
                    },
                    "&:hover .MuiOutlinedInput-root fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset":
                      { borderColor: "#FC5F03" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="text-black">Expiry Date</InputLabel>
                <TextField
                  name="expiryDate"
                  fullWidth
                  variant="outlined"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: "50px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#FC5F03",
                    },
                    "&:hover .MuiOutlinedInput-root fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset":
                      { borderColor: "#FC5F03" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="text-black">CVV</InputLabel>
                <TextField
                  name="cvv"
                  fullWidth
                  variant="outlined"
                  value={formData.cvv}
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: "50px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#FC5F03",
                    },
                    "&:hover .MuiOutlinedInput-root fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset":
                      { borderColor: "#FC5F03" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsChecked"
                        checked={formData.termsChecked}
                        onChange={handleChange}
                      />
                    }
                    label="I agree to terms & conditions"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="saveDetails"
                        checked={formData.saveDetails}
                        onChange={handleChange}
                      />
                    }
                    label="I agree to terms & conditions"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Pay Button */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          >
            <Link to="/successfull">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "150px" }}
                className="fw-bold text-capitalize"
              >
                Pay
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
