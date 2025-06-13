import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Link,
} from "@mui/material";
import vinylwindow from "../../assets/howtoapplycaulktowin.png";

const WindwoflushWithWall = () => {
  const { windwo_flush_with_wall } = content;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        {windwo_flush_with_wall.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={2}>
            <img src={vinylwindow} alt="Guide 1" />
          </Box>
        </Grid>

        <Grid item xs={12} className="mt-4">
          <Typography variant="body1" paragraph>
            {windwo_flush_with_wall.description_guide1}
          </Typography>
          <Typography variant="body1" paragraph>
            {windwo_flush_with_wall.description_guide2}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WindwoflushWithWall;
