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
import { Link } from "react-router-dom";
import temered_class from "../../assets/temered_class.png";
import safty_wire from "../../assets/safty.png";

const TemperedSafetyGlass = () => {
  const { tempered_safety_glass } = content;

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
          {tempered_safety_glass.title}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img src={temered_class} alt="tempered glass" className="w-100" />
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
              paddingX: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body1" paragraph>
              {tempered_safety_glass.introduction.text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" paragraph>
              {tempered_safety_glass.introduction.definition}
            </Typography>
          </Grid>
          {/* Hazardous Areas Section */}
          {/* <Box></Box> */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    {tempered_safety_glass.hazardous_areas.introduction}
                  </Typography>
                  <List sx={{ paddingLeft: 2, listStyleType: "disc" }}>
                    {tempered_safety_glass.hazardous_areas.list.map(
                      (item, index) =>
                        typeof item === "string" ? (
                          <ListItem
                            key={index}
                            sx={{ display: "list-item", paddingLeft: 0 }}
                          >
                            {item}
                          </ListItem>
                        ) : (
                          <ListItem
                            key={index}
                            sx={{ display: "list-item", paddingLeft: 0 }}
                          >
                            {item.text}
                            <List
                              sx={{ paddingLeft: 2, listStyleType: "circle" }}
                            >
                              {item.conditions.map((condition, idx) => (
                                <ListItem
                                  key={idx}
                                  sx={{ display: "list-item", paddingLeft: 0 }}
                                >
                                  {condition}
                                </ListItem>
                              ))}
                            </List>
                          </ListItem>
                        )
                    )}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {tempered_safety_glass.references.title}
                  </Typography>
                  <List sx={{ paddingLeft: 2, listStyleType: "disc" }}>
                    {tempered_safety_glass.references.links.map(
                      (link, index) => (
                        <ListItem
                          key={index}
                          sx={{ paddingLeft: 0 }}
                        >
                          <Link to="#" className="text-black">{link}</Link>
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <img src={safty_wire} alt="tempered glass" className="w-75" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TemperedSafetyGlass;
