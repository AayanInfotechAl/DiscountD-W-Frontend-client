import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import card_img1 from "../../assets/product_img1.jpeg";
import card_img2 from "../../assets/product_img2.jpeg";
import card_img3 from "../../assets/image 1.png";
import "../../styles/Home.scss";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useLocation } from "react-router-dom";

export const SubProducts = () => {
  const location = useLocation();
  const subproduct = location.state.subproduct;

  const spotlightDeals = [
    {
      id: 1,
      product_name: "Product 1",
      product_price: "200",
      url: card_img1,
    },
    {
      id: 2,
      product_name: "Product 1",
      product_price: "300",
      url: card_img2,
    },
    {
      id: 3,
      product_name: "Product 1",
      product_price: "150",
      url: card_img3,
    },
    {
      id: 4,
      product_name: "Product 1",
      product_price: "150",
      url: card_img1,
    },
  ];
  return (
    <Container className="mt-5 p-4">
      <Box className="spotlight_deals mb-3">
        <Typography variant="h4" className="heading_1">
          {subproduct?.product_name}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {spotlightDeals?.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 300, mx: "auto" }}>
              <CardMedia
                component="img"
                height="300"
                image={item?.url}
                alt="green iguana"
              />
              <CardContent sx={{ backgroundColor: "#0068B333" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#0068B3",
                    fontWeight: "bold",
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {item?.product_name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    $ {item?.product_price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="mt-2"
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                    className="w-100 me-2"
                  >
                    Buy Now
                  </Button>
                  <Link to="/cart" className="w-100">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                      className="w-100"
                    >
                      Add To Cart
                    </Button>
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="mt-1"
                >
                  <Box sx={{ color: "#0068B3", fontWeight: "bold" }}>
                    <FavoriteBorderIcon className="fs-6" />
                    Like
                  </Box>
                  <Box sx={{ color: "#0068B3", fontWeight: "bold" }}>
                    <ShareIcon className="fs-6" />
                    Share
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box className="text-center mt-4">
        <Button
          variant="outlined"
          sx={{ color: "#fc5f03", borderColor: "#fc5f03" }}
        >
          Show More
        </Button>
      </Box>
    </Container>
  );
};
