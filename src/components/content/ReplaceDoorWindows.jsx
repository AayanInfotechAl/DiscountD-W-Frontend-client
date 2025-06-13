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
import doorInformation from "../../assets/whyreplaceyourdoorswins.png";
import beforeafterwindowreplace from "../../assets/before_after_window_replace.jpeg";
import fiberglassdoorinfo from "../../assets/fiberglass_door_info.png";

const ReplaceDoorWindows = () => {
  const { replace_door_windows } = content;

  return (
    <Container
      sx={{
        mt: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        className="fw-bold"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
        }}
      >
        {replace_door_windows?.title}
      </Typography>
      <Box
        sx={{
          mt: { xs: 2, md: 4 },
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
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

          <Grid item xs={12}>
            <List sx={{ listStyleType: "decimal", pl: 2 }}>
              {replace_door_windows?.points.map((point, index) => (
                <ListItem key={index} sx={{ display: "list-item" }}>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Box>
            <Box display="flex" justifyContent="center">
              <img
                src={beforeafterwindowreplace}
                alt="Before After Window Replace"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Box>

          <Box className="mt-4">
            <Typography variant="body1">
              The doors and windows sold on our site are chosen for their high
              quality, aesthetics, and energy efficiency. We also provide all
              the Do-It-Yourself information you need, or we can recommend a
              pre-approved installer.
            </Typography>
            <Typography variant="body1">
              (*1) Source: http://www.doityourself.com/stry/ara_whyreplacewindow
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default ReplaceDoorWindows;
