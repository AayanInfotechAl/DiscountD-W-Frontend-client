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
import labour_warrinty from "../../assets/labour_warrinty.png";

const ApprovedInstallerDoorWindow = () => {
  const { approvedInstallerDoorWindow } = content;

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
          {approvedInstallerDoorWindow.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              // mt={2}
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img src={labour_warrinty} alt="Guide 1" className="w-100" />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              // alignItems: "center",
              textAlign: { xs: "center", md: "left" },
              paddingX: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body1">
              {approvedInstallerDoorWindow.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>{approvedInstallerDoorWindow.description1}</Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <List
              sx={{
                listStyleType: "disc",
                width: "100%",
                p: 3,
              }}
            >
              {approvedInstallerDoorWindow.related_articles.diy_window_guides.map(
                (guide, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "list-item",
                      listStyleType: "disc",
                      fontWeight: "bold",
                      lineHeight: "0.8rem",
                      "@media (max-width: 768px)": {
                        lineHeight: "1.2rem",
                      },
                    }}
                  >
                    {guide.prefix}&nbsp;
                    <Link
                      to={guide.url}
                      style={{ textDecoration: "underline", color: "black" }}
                    >
                      {guide.underlinedText}
                    </Link>
                  </ListItem>
                )
              )}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ApprovedInstallerDoorWindow;
