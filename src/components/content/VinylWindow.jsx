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
import vinylwindow from "../../assets/vinylwindow.png";
import vinylwindow1 from "../../assets/vinylwindow1.png";

const VinylWindow = () => {
  const { vinyl_window } = content;

  const videoUrls = [
    "https://www.youtube.com/embed/Vhwytq_ghVo",
    
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        {vinyl_window.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <img src={vinylwindow} alt="Guide 1" style={{ width: "100%" }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className="d-flex align-items-center">
          <Typography variant="body1" paragraph>
            {vinyl_window.description_guide}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box mb={2} className="px-4">
              <Typography variant="h5" className="fw-bold">Required Tools:</Typography>
              <List sx={{ listStyleType: "disc", pl: 2 }}>
                {vinyl_window.related_articles.diy_window_guides.map((guide, index) => (
                  <ListItem key={index} sx={{ display: "list-item", lineHeight: "0.8rem",
                    "@media (max-width: 768px)": {
                      lineHeight: "1.2rem",
                    }, }}>
                    <Link href="#" underline="hover" color="inherit">
                      {guide}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box mb={2} className="px-4">
              <img src={vinylwindow1} alt="Guide 2" height={300} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box className="px-4" display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between">
            <Box mb={2}>
              <Typography variant="h5" className="fw-bold">May Also Need:</Typography>
              <List sx={{ listStyleType: "disc", pl: 2 }}>
                {vinyl_window.related_articles.diy_door_guides.map((guide, index) => (
                  <ListItem key={index} sx={{ display: "list-item", lineHeight: "0.8rem",
                    "@media (max-width: 768px)": {
                      lineHeight: "1.2rem",
                    }, }}>
                    <Link href="#" underline="hover" color="inherit">
                      {guide}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Box className="text-center mb-2">
          <Typography variant="h5" gutterBottom className="fw-bold">
            Installation Instructions
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {videoUrls.map((url, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                style={{ width: "100%", maxWidth: "500px", aspectRatio: "16/9" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={url}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} className="mt-4">
          {vinyl_window.installation_steps.map((step, index) => (
            <Grid item xs={12} key={index}>
              <Box mb={2} className="px-4">
                <Typography variant="h6" className="fw-bold">
                  {step.step}: {step.title}
                </Typography>
                {step.details && (
                  <List sx={{ listStyleType: "disc", pl: 4 }}>
                    {step.details.map((detail, i) => (
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
      </Box>
    </Container>
  );
};

export default VinylWindow;
