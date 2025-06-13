import React from "react";
import content from "../../json/doors.json";
import {
  Container,
  Typography,
} from "@mui/material";

const AccurateDoorMeasurements = () => {
  const { accurate_door_measurements } = content;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        {accurate_door_measurements.title}
      </Typography>
    </Container>
  );
};

export default AccurateDoorMeasurements;
