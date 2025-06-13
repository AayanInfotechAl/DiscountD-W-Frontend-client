import React, { useState } from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import fiberglassdoorinfo from "../../assets/fiberglass_door_info.png";

const FiberglassDoor = () => {
  const { green_house_content } = content;

  return (
    <Container sx={{ mt: { xs: 2, md: 4 }, mb: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="fw-bold"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Fiberglass Door Versus Wood Door?
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <img src={fiberglassdoorinfo} alt="fiberglassdoorinfo" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="d-flex align-items-center">
          <Box>
            <Typography variant="body1" className="mb-3">
              If you are choosing an entry door, then you have 2 options: Wood
              or Fiberglass.
            </Typography>
            <Typography variant="body1" className="mb-3">
              <u>Wood doors</u> have a classy look and are a natural insulator.
              They have a sturdy heavy feel to them and are a good choice for
              areas that have a mild climate.
            </Typography>
            <Typography variant="body1" className="mb-3">
              <u>Fiberglass doors</u> are superior to wood in strength, and
              weather ability. they are resistant to sun damage and dents, and
              they do not chip, warp, rot, or crack. Fiberglass performs better
              in harsh climates. Fiberglass doors are textured to imitate the
              look of wood. Click here to learn more about our Fiberglass Doors
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FiberglassDoor;
