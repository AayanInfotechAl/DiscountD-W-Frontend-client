import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import vinylwindow from "../../assets/howtoapplycaulktowin.png";

const ApplyCaulkWindow = () => {
  const { apply_caulk_window } = content;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        {apply_caulk_window.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <img src={vinylwindow} alt="Guide 1" style={{ width: "100%" }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className="d-flex align-items-center">
          <Typography variant="body1" paragraph>
            {apply_caulk_window.description_guide}
          </Typography>
        </Grid>

        <Grid item xs={12} className="mt-4">
          <Typography variant="h5" className="fw-bold" paragraph>
            {apply_caulk_window.introduction}
          </Typography>
          <Box className="p-4">
            <p>
              a. The gap around the outside edge of the window where the Flush
              Fin touches the outside wall.
            </p>
            <p>b. The gap between the window frame, and the wall.</p>
            <p>
              a. The gap that the trim creates on the interior of the window
            </p>
          </Box>
        </Grid>
      </Grid>

      {/* ------------------------Installation Instructions------------------- */}
      <Grid container spacing={2}>
        {apply_caulk_window.installation_steps?.map((step, index) => (
          <Grid item xs={12} key={index}>
            <Box mb={2} className="px-4">
              <Typography variant="h6" className="fw-bold">
                {step.step}: {step.title}
              </Typography>
              {step.details && (
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                  {step.details?.map((detail, i) => (
                    <ListItem key={i} sx={{ display: "list-item" }}>
                      {detail}
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ApplyCaulkWindow;
