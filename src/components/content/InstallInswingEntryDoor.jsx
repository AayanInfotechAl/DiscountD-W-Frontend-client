import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Button } from "@mui/material";
import howtopaintsmoothskindoor from "../../assets/howtopaintsmoothskindoor.png";

const InstallInswingEntryDoor = () => {

  return (
    <Container className="mt-5 mb-4">
      <Typography variant="h4" component="h1" className="fw-bold mb-4">
        How to use Shims on an entry door
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <img
            src={howtopaintsmoothskindoor}
            alt="How to Paint Smooth Skin Door"
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="body1" className="mb-2">
            Shimming is an important part of installing an entry door. Shims are
            angled pieces of wood that are hammered into the gaps between the
            door frame, and the wall. Here is a video about shims:
          </Typography>
          <Typography variant="body1">
            Here is a video about how shims are used while installing an entry
            door.
          </Typography>
          <Typography variant="body1">
            Source: <span style={{ color: "#FC5F03" }}>plastpro</span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstallInswingEntryDoor;
