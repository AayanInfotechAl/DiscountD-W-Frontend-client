import React from "react";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import doorJambImage from "../../assets/howtopaintdoorjambs.png";
import jamb from "../../assets/jamb.png";

const PaintDoorJambs = () => {
  const paintdoors = [
    {
      title: "How to Paint Door Jambs?",
      description:
        "A door jamb is the vertical portion of the frame onto which a door is secured. Painting door jambs is not so difficult a task but it requires specific preparation and techniques based on the condition of the surface you are working with.",
      materials: [
        "Palm sander",
        "Masking paper",
        "Blue painter's tape",
        "2- to 3-inch oil-based paintbrush",
        "Oil-based primer",
        "Mineral spirits",
        "Oil-based paint",
        "2- to 3-inch latex paintbrush",
        "Acrylic latex primer",
        "Acrylic latex paint",
        "200-grit sandpaper",
        "Tackcloth",
      ],
      instructions: [
        {
          title: "a) Steps for Stained or Varnished Jambs",
          steps: [
            "Remove the glossy coat of varnish by sanding it with a palm sander stocked with 200-grit sandpaper.",
            "Tape the wall next to the door jamb with painter's tape.",
            "Cover flooring beneath the jamb with masking paper.",
            "Apply an oil-based primer with a 2- to 3-inch-based paintbrush. Allow the primer to dry for two hours.",
            "Finish with an acrylic latex paint, using a 2- to 3-inch-based paintbrush.",
          ],
        },
        {
          title: "b) Unfinished Wood Jambs",
          steps: [
            "Sand the surface lightly with 200-grit sandpaper.",
            "Tape the wall next to the door jamb with painter's tape.",
            "Apply an oil-based primer. Allow the primer to dry for two hours.",
            "Finish with an acrylic latex paint.",
          ],
        },
      ],
    },
  ];

  const doorContent = paintdoors[0];

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        {doorContent.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <img src={doorJambImage} alt="Door Jamb Guide" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="d-flex align-items-center">
          <Typography variant="body1" paragraph>
            {doorContent.description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} className="mt-4">
          <Typography
            variant="h6"
            gutterBottom
            className="fw-bold"
            sx={{ color: "#FC5F03" }}
          >
            Materials Required:
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            {doorContent.materials.map((material, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "list-item",
                  lineHeight: "0.8rem",
                  "@media (max-width: 768px)": {
                    lineHeight: "1.2rem",
                  },
                }}
              >
                {material}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6} className="text-center">
          <img src={jamb} alt="Door Jamb Guide" />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            className="fw-bold text-center"
            sx={{ color: "#FC5F03" }}
          >
            Instructions:
          </Typography>
          {doorContent.instructions.map((section, index) => (
            <Box key={index}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <List sx={{ listStyleType: "decimal", pl: 4 }}>
                {section.steps.map((step, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: "list-item",
                      lineHeight: "0.8rem",
                      "@media (max-width: 768px)": {
                        lineHeight: "1.2rem",
                      },
                    }}
                  >
                    {step}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}

          <Box mt={2}>
            <Typography variant="body1" gutterBottom>
              Tips: <br />
              It is not required to remove the door to paint a door jamb. Swing
              the door in and out to as needed during the application process.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Do not use an acrylic latex paint to coat a stained door jamb, or
              finish will peel.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Do not paint directly over a raw wood door jam, or the paint will
              eventually flake.
            </Typography>
            <Typography variant="body1" gutterBottom>
              To paint a door jamb which is already been painted,  apply a coat
              of acrylic latex paint with a 2- to 3-inch latex paintbrush.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              Resources: <br />
              Popular Mechanics: 5 Pro Painting Tips Every Amateur Should Know
            </Typography>
            <Typography variant="body1" gutterBottom>
              Photo Credit: sandpapier image by Thomas Aumann from Fotolia.com;
            </Typography>
            <Typography variant="body1" gutterBottom>
              e-How home: How to Paint Door Jambs By Ryan Lawrence, eHow
              Contributor
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaintDoorJambs;
