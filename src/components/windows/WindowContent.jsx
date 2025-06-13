import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography } from "@mui/material";
import windowimg from "../../assets/windowdescription.png";
import content from "../../json/doors.json";

const WindowContent = () => {
  const { window_estimate_description } = content;

  return (
    <Container className="mb-4">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6} className="d-flex justify-content-center">
          <Box
            sx={{
              textAlign: { xs: "left", md: "left" },
            }}
          >
            <Typography
              variant="h4"
              className="fw-bold"
              sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
            >
              {window_estimate_description.header.title}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}
            >
              {window_estimate_description.header.description}
            </Typography>
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            src={windowimg}
            alt="Window Description"
            sx={{
              width: { xs: "90%", sm: "70%", md: "100%" },
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>

      {/* Sections */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {window_estimate_description.sections.map((section, index) => (
            <Box
              key={index}
              className="mb-3 my-3"
              sx={{ textAlign: { xs: "left", md: "left" } }}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="fw-bold"
                sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
              >
                {section.description}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WindowContent;
