import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";

export const TrakingOrder = () => {
  const steps = [
    { label: "Order Confirmed", date: "Wed, 1st Jan" },
    { label: "Shipped", date: "Wed, 1st Jan" },
    { label: "Out For Delivery", date: "Wed, 2nd Jan" },
    { label: "Delivered", date: "Expected by Sat, 5th Jan" },
  ]

  return (
    <div>
      <Container sx={{ mt: 5, mb: 4 }}>
        <Box>
          <Typography
            variant="h4"
            align="center"
            className="fw-bold text-black"
          >
            Order ID: 3354654654526
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-2"
          >
            <Typography align="center" className="fw-bold me-4 text-black">
              <Typography component="span" color="text.secondary">
                Order date:
              </Typography>{" "}
              {new Date().toLocaleDateString()}
            </Typography>
            <Typography
              align="center"
              className="fw-bold"
              sx={{ color: "#0068B3" }}
            >
              Estimated delivery: Jan 5th, 2024
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-active": { color: "blue" },
                      "&.Mui-completed": { color: "gray" },
                    },
                  }}
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    "& .MuiStepLabel-label": {
                      fontWeight: "bold",
                      color: index === 0 ? "blue" : "gray",
                      marginBottom: "4px",
                    },
                    "& .MuiStepLabel-alternativeLabel": {
                      fontWeight: "normal",
                      color: "gray",
                      marginTop: "4px",
                    },
                  }}
                >
                  <Typography variant="body2">{step.label}</Typography>
                  <Typography variant="caption">{step.date}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </div>
  );
};
