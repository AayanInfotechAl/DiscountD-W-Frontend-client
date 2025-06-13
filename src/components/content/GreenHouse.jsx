import React from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";

import figure1 from "../../assets/greenhousewindowfig1.png";
import figure2 from "../../assets/greenhousewindowfig2.jpg";
import figure3 from "../../assets/greenhousewindowfig3.jpg";
import figure4 from "../../assets/greenhousewindowfig4.jpg";


import vinylwindow from "../../assets/vinylwindow.png";

const GreenHouse = () => {
  const { green_house_content } = content;
  console.log(green_house_content, 'green_house_content')

  return (
    <Container sx={{ mt: { xs: 2, md: 4 }, mb: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        How to Install a Green House Window
      </Typography>

      {/* Static header image */}
      <Box component="img" src={vinylwindow} alt="Vinyl Window" sx={{ mb: 4 }} />

      <Grid container spacing={2}>
        {green_house_content.map((step, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: "#FC5F03", fontWeight: "bold" }}>
                    {step.step}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                  <Box
                    component="img"
                    src={step.image}
                    alt={`${step.step} illustration`}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                  <Box
                    component="img"
                    src={step.image}
                    alt={`${step.step} illustration`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: "#FC5F03", fontWeight: "bold" }}>
                    {step.step}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default GreenHouse;
