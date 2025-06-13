import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Button } from "@mui/material";
import howtopaintsmoothskindoor from "../../assets/howtopaintsmoothskindoor.png";

const SkinDoor = () => {
 
  const skindoor = [
    
  ]

  return (
    <Container className="mt-5">
      <Typography variant="h4" component="h1" className="fw-bold mb-4">
        How to Paint Smooth Skin Door?
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} className="text-center">
          <img
            src={howtopaintsmoothskindoor}
            alt="How to Paint Smooth Skin Door"
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="body1" className="mb-2">
            1. Steps to paint Smooth Skin Door
          </Typography>
          <Typography variant="body1" className="mb-2">
            2. Use coupon code: SMOOTHSKIN to receive a $100 discount when you
            purchase any smooth skin door from Discount Door Window.
          </Typography>
          <Typography variant="body1" className="mb-2">
            3. Painting a smooth skin door is not as difficult as you may think.
            Here are some easy steps to help you paint your smooth skin door.
          </Typography>
          <Typography variant="body1" className="mb-2">
            4. 1) Collect the materials required for painting smooth skin doors.
            Here is a list of materials required for painting your smooth skin
            door.
          </Typography>
          <Box pl={4}>
            <Typography variant="body1" className="mb-2">
              a. Acetone
            </Typography>
            <Typography variant="body1" className="mb-2">
              b. Lint-free cloth
            </Typography>
            <Typography variant="body1" className="mb-2">
              c. Masking tape
            </Typography>
            <Typography variant="body1" className="mb-2">
              d. Rubber gloves
            </Typography>
            <Typography variant="body1" className="mb-2">
              e. 4" bristle brush
            </Typography>
            <Typography variant="body1" className="mb-2">
              f. Fine Scotch Brite Pad or 320-400 grit sandpaper
            </Typography>
            <Typography variant="body1" className="mb-2">
              g. For Water-based application: Acrylic primer/acrylic latex-based
              exterior grade paint.
            </Typography>
          </Box>

          <Typography variant="body1" className="mb-2">
            5. 2) Prepare the surface for painting smooth skin door. Following are the steps for surface preparation for smooth skin doors.
          </Typography>
          <Box pl={4}>
            <Typography variant="body1" className="mb-2">
              a. Firstly lay door horizontally on a table.
            </Typography>
            <Typography variant="body1" className="mb-2">
              b. Now remove all the hardware and mask off anything you don't want painted, for example- the glass insert.
            </Typography>
            <Typography variant="body1" className="mb-2">
              c. Lightly scuff sand the surface with Scotch Brite pad or fine sandpaper.
            </Typography>
            <Typography variant="body1" className="mb-2">
              d. Now you should wipe the door with acetone to clean any dust or residue from the surface. Allow acetone to dry from the surface before applying
            </Typography>
          </Box>

          <Typography variant="body1" className="mb-2">
            6. *Remember:  Do not use hydrocarbon   based solvents to clean the surface as such products may leave a residue.
          </Typography>
          <Box pl={4}>
            <Typography variant="body1" className="mb-2">
              a. Now you can apply primer with a 4" brush beginning with the panels. Follow the manufacturer's instructions for drying time before applying topcoat.
            </Typography>
            <Typography variant="body1" className="mb-2">
              b. The primer must be completely dry before applying the topcoat.
            </Typography>
          </Box>
          
          <Typography variant="body1" className="mb-2">
            7. 3) Paint the smooth skin door. Following are the steps to be followed for painting the smooth skin door.
          </Typography>
          <Box pl={4}>
            <Typography variant="body1" className="mb-2">
              a. Apply exterior grade paint with 4" brush beginning with the panels.
            </Typography>
            <Typography variant="body1" className="mb-2">
              b. It is common practice to paint both stiles the same color as the exterior side of the door. If applying a second coat, follow the manufacturer's instructions for drying time between coats.
            </Typography>
          </Box>

          <Typography variant="body1" className="mb-2">
            8. Following are the cautions to be taken care of during painting smooth skin door
          </Typography>
          <Box pl={4}>
            <Typography variant="body1" className="mb-2">
              a. When using stains, mineral spirits, paints, or other hazardous materials, always read and follow the manufacturer's instructions.
            </Typography>
            <Typography variant="body1" className="mb-2">
              b. When working with paints or solvents, make sure the working area is well ventilated.
            </Typography>
            <Typography variant="body1" className="mb-2">
              c. Keep away from heat and flame, as materials may be combustible.
            </Typography>
            <Typography variant="body1" className="mb-2">
              d. Paints or solvents may cause skin and eye irritation. Avoid contact with skin and eyes.
            </Typography>
            <Typography variant="body1" className="mb-2">
              d. Keep out of reach of children.
            </Typography>
          </Box>

          <Typography variant="body1" className="mb-2">
            9. Following is tip for normal maintenance
          </Typography>
          <Typography variant="body1" className="mb-2">
            10. Even a well-finished fiberglass door will be affected by exposure and weathering from sun, moisture, and air pollutants. It is considered normal maintenance to re-apply the topcoat approximately every two years.
          </Typography>
          <Typography variant="body1" className="mb-2">
            11. Use coupon code: SMOOTHSKIN for getting  $100 discount on purchase of any smooth skin door from Discount Door Window.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SkinDoor;
