import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import banner from "../../assets/doors.png";
import card_img1 from "../../assets/window.png";
import card_img2 from "../../assets/blog.png";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useLocation } from "react-router-dom";

const Orders = () => {
  const location = useLocation();

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const products = [
    {
      id: 1,
      title: "Window 1",
      price: 200,
      description: "Lorem ipsum dolor sit amet",
      imageUrl: card_img1,
      isDelivered: true,
      trackOrder: true,
    },
    {
      id: 2,
      title: "Product",
      price: 200,
      description: "Lorem ipsum dolor sit amet,",
      imageUrl: card_img2,
    },
  ];

  return (
    <div className="doors-container px-3 mb-4">
      {/* Banner Section */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "200px", md: "300px" }, // Responsive height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            className="text-black fw-bold"
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            Orders
          </Typography>
          <Typography
            variant="body1"
            className="text-black fw-bold"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            <span>
              Home {">"} {formatPath(location.pathname)}
            </span>
          </Typography>
        </Box>
      </Box>

      <Container className="mt-4">
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  maxWidth: { xs: "100%", sm: 500 },
                  height: { xs: "auto", sm: 200 },
                  position: "relative",
                  margin: "auto",
                }}
              >
                {/* Delivered Chip */}
                {product.isDelivered && (
                  <Chip
                    label="Delivered"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 1,
                      borderRadius: 2,
                      fontSize: { xs: "0.6rem", md: "0.8rem" },
                    }}
                  />
                )}
                {/* Card Media */}
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 151 },
                    height: { xs: "150px", sm: "200px" },
                    objectFit: "cover",
                  }}
                  image={product.imageUrl}
                  alt={product.title}
                />
                {/* Card Content */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#CCDFF1",
                    width: "100%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                      >
                        ${product.price}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      {product.description}
                    </Typography>

                    {/* Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                        my: 1,
                      }}
                    >
                      {product.trackOrder ? (
                        <Link to="/order-track" style={{ width: "100%" }}>
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            sx={{
                              fontSize: { xs: "0.7rem", md: "0.8rem" },
                              padding: "6px",
                            }}
                          >
                            Track Order
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ fontSize: "0.8rem", width: "48%" }}
                          >
                            Rebook
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: "0.8rem", width: "48%" }}
                          >
                            Add to Cart
                          </Button>
                        </>
                      )}
                    </Box>

                    {/* Icons */}
                    {!product.trackOrder && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        className="mt-1"
                      >
                        <Box
                          sx={{ fontWeight: "bold", color: "#0068B3", fontSize: "0.9rem" }}
                        >
                          <FavoriteBorderIcon fontSize="small" /> Like
                        </Box>
                        <Box sx={{ color: "#0068B3", fontWeight: "bold", fontSize: "0.9rem" }}>
                          <ShareIcon fontSize="small" /> Share
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Orders;
