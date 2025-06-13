import React from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import figure1 from "../../assets/howtopaintfiberglassdoor.jpeg";
import figure2 from "../../assets/howToPaintFiberglassDoor2.jpg";
import figure3 from "../../assets/howToPaintFiberglassDoor3.jpg";
import figure4 from "../../assets/howToPaintFiberglassDoor4.jpg";


import howtopaintfiberglassdoor from "../../assets/howtopaintfiberglassdoor.png";

const PaintFiberglassDoor = () => {
  const { paint_fiberglass_door } = content;

  const caution = [
    "When using stains, mineral spirits, paints or other hazardous materials, always read and follow the manufacturers' products.",
    "When working with paints or solvents, make sure the working area is well ventilated.",
    "Keep away from heat and flame as materials may be combustible.",
    "Paints or solvents may cause skin and eye irritation. Avoid contact with skin and eyes.",
    "Keep out of reach of children.",
  ];

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
        {paint_fiberglass_door.title}
      </Typography>
      <Box
        component="img"
        src={howtopaintfiberglassdoor}
        alt="Fiberglass Door"
      />

      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ color: "#FC5F03", fontWeight: "bold" }}
          >
            Materials:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - Lint-free cloth
            <br />
            - Acetone
            <br />
            - Rubber Glove
            <br />
            - Masking tape
            <br />
            - 4" Bristle Brush
            <br />- For water-based application: Acrylic-based primer*/acrylic
            latex-based exterior grade paint.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box component="img" src={figure1} />
        </Grid>

        <Grid item xs={12} md={6} className="text-center">
          <Box sx={{width:"300px"}}>
            <Box>
              <img src={figure2} alt="" />
            </Box>
            <Box className="text-end">
              <img src={figure3} alt="" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ color: "#FC5F03", fontWeight: "bold" }}
          >
            Step 1: Surface Preparation
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            1. Lay door horizontally on saw horses or a table.
            <br />
            2. Remove all the hardware and mask off anything you don't want
            painted, such as the glass insert.
            <br />
            3. Do not sand grained Fiberglass.
            <br />
            4. Wipe the door with acetone to clean any dust or residue from the
            surface.
            <br />
            5. Allow acetone to dry from the surface before applying paint. Do
            not use hydro-carbon based solvents to clean the surface as such
            products may leave a residue.
            <br />
            6. Apply primer with a 4" brush beginning with the panels. Follow
            the manufacturer's instructions for drying time before applying
            topcoat.
            <br />
            7. The primer must be completely dry before applying any finish
            topcoat.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ color: "#FC5F03", fontWeight: "bold" }}
          >
            Step 2: Painting
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            1. Apply exterior grade paint with 4" brush in the direction of the
            grain.
            <br />
            2. It is common practice to paint both stiles the same color as the
            exterior side of the door. If applying a second coat, follow the
            manufacturer's instructions for drying time between coats.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className="text-end">
          <img src={figure4} alt="" />
        </Grid>

        <Grid item xs={12} className="text-center">
          <Typography
            variant="h6"
            sx={{ color: "#FC5F03", fontWeight: "bold", mb:3 }}
          >
            Caution
          </Typography>
          <Box sx={{color:"#0068B3"}}>
            <Typography variant="h5" className="fw-bold" sx={{ mb: 2 }}>
              1. When using stains, mineral spirits, paints or other hazardous
              materials, always read and follow the manufacturers' products.
            </Typography>
            <Typography variant="h5" className="fw-bold" sx={{ mb: 2 }}>
              2. When working with paints or solvents, make sure the working
              area is well ventilated.
            </Typography>
            <Typography variant="h5" className="fw-bold" sx={{ mb: 2 }}>
              3. Keep away from heat and flame as materials may be combustible.
            </Typography>
            <Typography variant="h5" className="fw-bold" sx={{ mb: 2 }}>
              4. Paints or solvents may cause skin and eye irritation. Avoid
              contact with skin and eyes.
            </Typography>
            <Typography variant="h5" className="fw-bold" sx={{ mb: 2 }}>
              5. Keep out of reach of children.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaintFiberglassDoor;
