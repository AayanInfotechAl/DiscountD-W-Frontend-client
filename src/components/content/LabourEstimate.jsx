import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EmailIcon from "@mui/icons-material/Email";
import labour_warrinty from "../../assets/labour_warrinty.png";
import card_img1 from "../../assets/product_img1.jpeg";
import card_img2 from "../../assets/product_img2.jpeg";
import card_img3 from "../../assets/image 1.png";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LabourEstimate = () => {
  const { labour_estimate } = content;

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
    <div className="mb-4">
      <Container sx={{ mt: { xs: 2, md: 4 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          className="fw-bold"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.125rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {labour_estimate.title}
        </Typography>
        <Grid container spacing={2}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img src={labour_warrinty} alt="Guide 1" className="w-100" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              SKU: {labour_estimate.SKU}
            </Typography>
            <Typography variant="body1" paragraph>
              {labour_estimate.description}
            </Typography>
            <Typography variant="body1" paragraph>
              {labour_estimate.note}
            </Typography>
          </Grid>

          {/* ------------------------------------------------------- */}

          <Grid item xs={12}>
            <Typography variant="h5" className="fw-bold">
              Pricing: $0.00
            </Typography>

            {/* Main form container */}
            <Grid container spacing={2}>
              {/* Date Field 1 */}
              <Grid item xs={12} sm={6} md={3}>
                <Box mt={2}>
                  <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                    Preferred Date for Appointment
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Select Date"
                    sx={{
                      mt: 1,
                      width: "100%",
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>

              {/* Date Field 2 */}
              <Grid item xs={12} sm={6} md={3}>
                <Box mt={2}>
                  <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                    Preferred Date for Appointment
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Select Date"
                    sx={{
                      mt: 1,
                      width: "100%",
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>

              {/* Quantity Select */}
              <Grid item xs={12} sm={6} md={3}>
                <Box mt={2}>
                  <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                    Qty
                  </InputLabel>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      defaultValue=""
                      sx={{
                        mt: 1,
                        backgroundColor: "#D0E5F4",
                        borderRadius: "10px",
                        "& fieldset": { border: "none" },
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* Add to Cart Button */}
              <Grid item xs={12} sm={6} md={3}>
                <Box mt={2} sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 1,
                      textTransform: "none",
                      mt: 4,
                      padding: "13px 14px",
                      width: "100%",
                    }}
                    startIcon={<i className="fa-solid fa-plus"></i>}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Additional Buttons */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3A3A3A",
                    color: "white",
                    borderRadius: 1,
                    textTransform: "none",
                    width: "100%",
                  }}
                  startIcon={<AddIcon />}
                >
                  Add to Wishlist
                </Button>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3A3A3A",
                    color: "white",
                    borderRadius: 1,
                    textTransform: "none",
                    width: "100%",
                  }}
                  startIcon={<QuestionMarkIcon />}
                >
                  Item Inquiry
                </Button>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3A3A3A",
                    color: "white",
                    borderRadius: 1,
                    textTransform: "none",
                    width: "100%",
                  }}
                  startIcon={<EmailIcon />}
                >
                  Tell a Friend
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* What to Expect Section */}
          <Grid item xs={12}>
            <Typography variant="h5" className="fw-bold">
              Description
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ bgcolor: "#FC5F03", p: 2, color: "white" }}>
              <Typography variant="h6" gutterBottom>
                {labour_estimate.what_to_expect.title}
              </Typography>
              <Box sx={{ ml: 3 }}>
                <Typography variant="body1" paragraph sx={{ mb: 0 }}>
                  {labour_estimate.what_to_expect.description}
                </Typography>
                <List
                  sx={{
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                >
                  {labour_estimate.what_to_expect.pricing_estimates.map(
                    (estimate, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: "list-item",
                          listStyleType: "disc",
                        }}
                      >
                        <ListItemText primary={estimate} />
                      </ListItem>
                    )
                  )}
                </List>

                <Typography variant="subtitle1" gutterBottom>
                  Included Services:
                </Typography>
                <List
                  sx={{
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                >
                  {labour_estimate.what_to_expect.included_services.map(
                    (service, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: "list-item",
                          listStyleType: "disc",
                        }}
                      >
                        <ListItemText primary={service} />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Box>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Labor Warranty Information */}
          <Grid item xs={12}>
            <Box sx={{ bgcolor: "#FC5F03", p: 2, color: "white" }}>
              <Typography variant="h6" gutterBottom>
                {labour_estimate.labor_warranty_information.title}
              </Typography>
              <Box sx={{ ml: 3 }}>
                <Typography variant="body1" paragraph>
                  {labour_estimate.labor_warranty_information.description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12}>
            <Box sx={{ bgcolor: "#FC5F03", py: 4, p: 3 }}>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Contact Form
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
                  Use this form to contact us with questions, comments, or
                  feedback:
                </Typography>
              </Box>
              <Box className="px-5">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: "white" }}>
                      Your name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Abc"
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: "white" }}>
                      Email address
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Abc@def.com"
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: "white" }}>
                      Mobile No.
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="+123456789"
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: "white" }}>
                      Message
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Hi! I’d like to ask about"
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#1E73BE",
                        color: "white",
                        borderRadius: 1,
                        mt: 2,
                        "&:hover": { bgcolor: "#155a8a" },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* --------------------May We Suggest----------------------------------- */}

          {/* <Grid item xs={12} mt={4}>
            <Box className="text-center" mb={4}>
              <Typography variant="h5" className="fw-bold">
                May We Suggest
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
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
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: "none", fontWeight: "bold" }}
                          className="w-100"
                        >
                          Add To Cart
                        </Button>
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
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default LabourEstimate;
