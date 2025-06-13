import React, { useState } from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import jambs from "../../assets/jambs.png";

const SlabHungDoor = () => {
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
        Slab Door Vs. Pre Hung Door
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} className="d-flex align-items-center">
          <Box>
            <Typography variant="body1" className="mb-3">
              A Slab Door is a rectangular slab of wood, fiberglass or steel. It
              is the door by itself without frame, hinges and hardware.
            </Typography>
            <Typography variant="body1" className="mb-3">
              A Pre Hung Door comes with everything needed to install and setup.
              It is a door slab that comes with its own frame and hinges.
            </Typography>
            <Typography variant="body1" className="mb-3">
              PricingSlab Doors <br />
               are cheaper than Pre Hung Doors since they are missing the frame
              and hinges.
            </Typography>
            <Typography variant="body1" className="mb-3">
              How To Choose?
            </Typography>
            <Typography variant="body1" className="mb-3">
              Generally speaking, people usually get a Slab Door if the door
              they are installing is the exact same size and setup as the door
              being replaced. Any difference in door size or screw locations can
              make it difficult to make your door hang properly. If you already
              have a door frame in place, a slab door is probably the best
              option for you.
            </Typography>
            <Typography variant="body1" className="mb-3">
              Get a Pre Hung Door if you are constructing a new room or your
              existing space is damaged from restoration work.
            </Typography>
            <Typography variant="body1" className="mb-3">
              Click <u>here</u> to view our selection of doors.
            </Typography>
            <Typography variant="body1">Reference: Wikipedia</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SlabHungDoor;
