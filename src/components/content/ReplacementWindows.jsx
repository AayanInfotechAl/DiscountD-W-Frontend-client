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
import replacement from "../../assets/replacement.png";

const ReplacementWindows = () => {
  const { replacement_window } = content;

  return (
    <div>
      <Container sx={{ mt: { xs: 2, md: 4 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.8rem", md: "2.125rem" },
            textAlign: { xs: "center", md: "left" },
            fontWeight: "bold",
          }}
        >
          {replacement_window.title}
        </Typography>

        <Grid container spacing={2}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img
                src={replacement}
                alt="Replacement Guide"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>

          {/* Introduction */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              {replacement_window.introduction}
            </Typography>
          </Grid>

          {/* Topics with Sub-Methods */}
          <Grid item xs={12}>
            {replacement_window.topics.map((topic, index) => (
              <Box key={index} sx={{ mb: 4, px: 4 }}>
                <Typography variant="body1">
                  {`${index + 1}. ${topic.title}`}
                </Typography>

                <Typography variant="body1">
                  {topic.description}
                </Typography>
                {topic.methods && (
                  <List>
                    {topic.methods.map((method, idx) => (
                      <ListItem key={idx}>
                        <Typography variant="body2">
                          {`${String.fromCharCode(97 + idx)}. ${
                            method?.name
                          } - ${method?.description}`}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ReplacementWindows;
