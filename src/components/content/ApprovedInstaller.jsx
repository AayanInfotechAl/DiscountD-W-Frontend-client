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
import card_img2 from "../../assets/hireinstaller 1.png";
import Loader from "../../loader/Loader";

const ApprovedInstaller = () => {
  const [loading, setLoading] = useState(true);
  const { pre_approved_installer } = content;

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
            {pre_approved_installer.title}
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <img
                  src={card_img2}
                  alt="Guide 1"
                  className="w-100"
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                textAlign: { xs: "center", md: "left" },
                paddingX: { xs: 2, md: 0 },
              }}
            >
              <p className="mb-0">
                {pre_approved_installer.description}
              </p>
            </Grid>
            <Grid item xs={12}>
              <p className="mb-0">
                {pre_approved_installer.description1}
              </p>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                paddingX: { xs: 2, md: 0 },
              }}
            >
              <List
                sx={{
                  listStyleType: "disc",
                  paddingLeft: { xs: 2, md: "20px" },
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                {pre_approved_installer.related_articles.diy_window_guides.map(
                  (guide, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        lineHeight: { xs: "1.5rem", md: "1.8rem" },
                        fontWeight: "bold",
                        lineHeight: "0.8rem",
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
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default ApprovedInstaller;
