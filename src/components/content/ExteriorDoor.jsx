import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Link,
} from "@mui/material";
import howtoremoveexteriordoor from "../../assets/howtoremoveexteriordoor.png";

const ExteriorDoor = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className="fw-bold">
        How to Remove an Exterior Door
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={2}>
            <img src={howtoremoveexteriordoor} alt="Guide 1" />
          </Box>
        </Grid>

        <Grid item xs={12} className="mt-4">
          <Typography variant="body1" paragraph>
            1. The process of removing an entry door varies quite a bit
            depending on your situation. There are a few things you should look
            into first.
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              Check to see if there is an alarm system built into the door.
              There may be wires that need to be cut, or removed.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              Check the top horizontal exterior trim, and see if there is an
              integal flashing that goes behind the trim. It usually sticks out
              a bit to direct the rain around the door. If there is, then you
              want to consider leaving the top trim in place. You can still put
              the door in from by tilting it from the inside. The video below
              talks about this.  
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              be sure to have an assistant there to help with removing the door
              frame.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              Measure the door after you have removed the interior trim, and
              confirm that the new door you will be putting in fits the opening
              you are about to create.
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            2. Once you have check for these things, you ready to remove the
            entry door. Below is a video that can help show you how to remove an
            entry door that has 2 sidelights. The process of taking out an old
            double door is pretty much the same.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExteriorDoor;
