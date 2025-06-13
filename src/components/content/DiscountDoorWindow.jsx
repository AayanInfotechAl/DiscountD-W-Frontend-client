import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import doorInformation from "../../assets/doorInformation.png";
import fiberglass_door_wnumber from "../../assets/fiberglass_door_wnumber.jpeg";
import fiberglassdoorinfo from "../../assets/fiberglass_door_info.png";

const DiscountDoorWindow = () => {
  const { discount_door_window } = content;

  return (
    <Container sx={{ mt: { xs: 2, md: 4 }, mb: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="fw-bold"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
          textAlign: "center",
        }}
      >
        {discount_door_window?.title}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          container
          spacing={2}
          className="w-75"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <img
                src={doorInformation}
                alt="Door Information"
                style={{ width: "100%", maxWidth: 1000 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <List sx={{ listStyleType: "decimal", pl: 2 }}>
              {discount_door_window?.points.map((point, index) => (
                <ListItem key={index} sx={{ display: "list-item" }}>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <img
              src={fiberglass_door_wnumber}
              alt="Door Information"
              style={{ width: "100%", maxWidth: 300 }}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          className="fw-bold"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.125rem" },
          }}
        >
          Hydroshield Technology
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 2,
          }}
        >
          <Box
            sx={{ maxWidth: { xs: "100%", md: "35%" }, textAlign: "center" }}
          >
            <img src={fiberglassdoorinfo} alt="Door Information" />
          </Box>
          <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Exclusive water-resistant seal protects these doors against water
              infiltration on all sides to prevent water damage such as warping,
              delamination, corrosion, rotting, and the buildup of mold and
              mildew.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              This Hydroshield seal consists of:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Fiberglass Reinforced Door Skins:</strong> Our high-impact
              compression molded skins will not splinter, dent, warp, rot or
              rust. Surfaces are easy to stain or paint, and easy to clean. Our
              deep-profile fiberglass skins create stronger dimensions and
              crisper shadow lines. Architecturally correct stile and rail
              proportions enhance the door's traditional oak appearance.
              <br />
              <strong>Full-length Composite Stiles:</strong> Our full-length
              composite stiles provide complete waterproofing for the door's
              insulation. Composite stiles have two times the screw-holding
              capabilities of traditional wood-edged doors and will never
              splinter like wood or delaminate like steel.
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Composite Top & Bottom Rails: High-strength engineered composite top
          and bottom rails prevent moisture from seeping into the door. Bottom
          rails will also accommodate a range of door sweeps.
        </Typography>
      </Grid>
    </Container>
  );
};

export default DiscountDoorWindow;
