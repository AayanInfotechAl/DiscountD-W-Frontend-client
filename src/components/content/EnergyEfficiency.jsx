import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import bulb from "../../assets/bulb.png";
import efficiencydoors from "../../assets/efficiencydoors.png";
import retrosoft from "../../assets/retrosoft.png";

const EnergyEfficiency = () => {
  const { energy_efficiency } = content;

  return (
    <div>
      <Container sx={{ mt: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          gutterBottom
          className="fw-bold"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.125rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {energy_efficiency.title}
        </Typography>

        <Grid container spacing={2}>
          {/* Introduction Section */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img
                src={bulb}
                alt="Importance of Energy Efficiency"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body1" paragraph>
              {energy_efficiency.introduction.text}
            </Typography>
          </Grid>

          {/* Sections */}
          <Grid item xs={12} className="mt-4">
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Doors and Windows that pay for themselves
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {energy_efficiency.doors_and_windows.text}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Energy Efficient Technology
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {energy_efficiency.energy_efficient_technology.text}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <img src={efficiencydoors} alt="Efficiency Doors" style={{ maxHeight: 300, width: "auto" }} />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Measuring Efficiency
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {energy_efficiency.measuring_efficiency.text}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Conclusion
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {energy_efficiency.conclusion.text}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <img src={retrosoft} alt="Retrosoft" style={{ maxHeight: 300, width: "auto" }} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EnergyEfficiency;
