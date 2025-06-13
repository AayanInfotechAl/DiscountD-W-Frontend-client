import React from "react";
import { Grid, Typography, Button, Box, Container } from "@mui/material";
import card_img1 from "../../assets/image 1.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export const MeasuredDoors = () => {
  return (
    <div>
      <Container className="mt-4">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box>
                <img
                  src={card_img1}
                  alt="Wood Entry Door"
                  style={{ maxWidth: 400, maxHeight: 400, borderRadius: "8px" }}
                />
                <Typography variant="h4" sx={{ mt: 2 }} className="fw-bold">
                  Wood Entry Door
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet.
                </Typography>
              </Box>
            </Grid>

            {/* Right Options and Pricing Section */}
            <Grid item xs={12} md={8}>
              <Box sx={{ padding: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">Width</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">25 inch</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Height</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">32 inch</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2">Fraction</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Selected Fraction</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Grid</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Selected Grid</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2">Fin Type</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Selected Fin Type</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Glass Type</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Fiber</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2">Color</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">White</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Tempering Option</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Selected Option</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2">Side Window Open</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Yes</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Installation Option</Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">Selected Option</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Special Instructions, Questions or Comments?
                    </Typography>
                    <Typography variant="body1">
                      <strong className="fs-5">No Comments</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* ------------------Pricing Section------------------------------- */}
          <Grid
            container
            rowSpacing={1}
            marginTop={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="mb-4"
          >
            <Grid item xs={6}>
              <Typography variant="h6">
                Pricing (According to selected options)
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                className="fw-bold"
                sx={{ width: "150px", backgroundColor: "black" }}
              >
                $ 849
              </Button>
              <Link to="/cart">
                <Button
                  variant="contained"
                  className="fw-bold"
                  sx={{ width: "150px", backgroundColor: "#FC5F03" }}
                >
                  Add to cart
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant="contained"
                  className="fw-bold"
                  sx={{ width: "150px" }}
                >
                  Next <ArrowForwardIcon />
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
