import React, { useEffect, useState } from "react";
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
import card_img1 from "../../assets/Group 35593.png";
import card_img2 from "../../assets/tape_measure200 2.png";
import Loader from "../../loader/Loader";

const AccurateMeasurements = () => {
  const [loading, setLoading] = useState(true);
  const { accurate_measurements } = content;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth={false} sx={{ mt: { xs: 2, md: 4, mb: 3 } }}>
          <Typography
            variant="h4"
            gutterBottom
            className="fw-bold"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.125rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {accurate_measurements.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                mt={2}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <img
                  src={card_img1}
                  alt="Guide 1"
                  className="w-100"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                mt={2}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <img
                  src={card_img2}
                  alt="Guide 1"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                  }}
                  height="300"
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: { xs: "center", md: "left" },
                paddingX: { xs: 2, md: 0 },
              }}
            >
              <Box>
                <Typography variant="body1" paragraph>
                  {accurate_measurements.description}
                </Typography>
                <List
                  sx={{
                    listStyleType: "disc",
                    paddingLeft: { xs: 2, md: "20px" },
                    maxWidth: "500px",
                    width: "100%",
                  }}
                >
                  {accurate_measurements.related_articles.diy_window_guides.map(
                    (guide, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: "list-item",
                          listStyleType: "disc",
                          lineHeight: "0.8rem",
                          fontWeight: "bold",
                          color: "#0078c2",
                        }}
                      >
                        <Link
                          to={guide?.path}
                          underline="hover"
                          className="text-decoration-none text-primary"
                        >
                          {guide?.title}
                        </Link>
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default AccurateMeasurements;