import React, { useState } from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import jambs from "../../assets/jambs.png";

const JambsExplained = () => {
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
        Door Jambs Explained
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <img src={jambs} alt="Installer" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="d-flex align-items-center">
          <Box>
            <Typography variant="body1" className="mb-3">
              Door jambs play a crucial role in the overal security of a door.
              They are the vertical part of the frame onto which a door is
              secured. Most door fasteners and deadbolts extend into a recess of
              a door jamb when engaged
            </Typography>
            <Typography variant="body1" className="mb-3">
              For prehung doors, standard wall constructed with 2 x 4 studs and
              1/2" sheetrock on both sides would have a wall thickness of 4
              9/16"
            </Typography>
            <Typography variant="body1">Reference: Wikipedia</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JambsExplained;
