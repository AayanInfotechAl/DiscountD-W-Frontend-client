import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import banner from "../../assets/doors.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import card_img1 from "../../assets/image 1.png";
import card_img2 from "../../assets/blog.png";
import card_img3 from "../../assets/blog1.png";
import Divider from "@mui/material/Divider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import content from "../../json/doors.json";
import { useLocation } from "react-router-dom";

const basePrice = 0;

export const Doors = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    width: "",
    height: "",
    fraction: "",
    grid: "",
    finType: "",
    glassType: "",
    color: "",
    temperingOption: "",
    sideWindowOpens: "",
    installationOption: "",
    instructions: "",
  });
  const [price, setPrice] = useState(basePrice);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isCustomHeightWidth, setIsCustomHeightWidth] = useState(false);
  const [showCustomHeightWidth, setShowCustomHeightWidth] = useState(false);

  const location = useLocation();
  const { subcategory } = location.state || {};

  const categories = [
    "Wood Entry Door",
    "Fiber Glass Entry Doors",
    "Vinyl Sliding Patio Doors",
    "Fiberglass French Doors",
    "French Wood Doors",
    "Vinyl Swinging French Door",
    "Hardware",
    "Other Doors",
  ];

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculatePrice = () => {
    let calculatedPrice = basePrice;
    if (selectedOptions.width)
      calculatedPrice += parseInt(selectedOptions.width);
    if (selectedOptions.height)
      calculatedPrice += parseInt(selectedOptions.height);
    if (selectedOptions.fraction)
      calculatedPrice += parseInt(selectedOptions.fraction);
    if (selectedOptions.grid) calculatedPrice += parseInt(selectedOptions.grid);
    if (selectedOptions.finType)
      calculatedPrice += parseInt(selectedOptions.finType);
    if (selectedOptions.glassType)
      calculatedPrice += parseInt(selectedOptions.glassType);
    if (selectedOptions.color)
      calculatedPrice += parseInt(selectedOptions.color);
    if (selectedOptions.temperingOption)
      calculatedPrice += parseInt(selectedOptions.temperingOption);
    if (selectedOptions.sideWindowOpens)
      calculatedPrice += parseInt(selectedOptions.sideWindowOpens);
    if (selectedOptions.installationOption)
      calculatedPrice += parseInt(selectedOptions.installationOption);

    if (showCustomHeightWidth) {
      if (customWidth && !isNaN(customWidth)) {
        calculatedPrice += parseFloat(customWidth) * 10;
      }
      if (customHeight && !isNaN(customHeight)) {
        calculatedPrice += parseFloat(customHeight) * 10;
      }
    }

    setPrice(calculatedPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedOptions, customWidth, customHeight, showCustomHeightWidth]);

  const images = [
    card_img1,
    card_img2,
    card_img3,
    card_img1,
    card_img2,
    card_img3,
    card_img2,
  ];

  const maxVisibleImages = 2;
  const remainingImages = images.length - maxVisibleImages;

  const handleCustomHeightWidthToggle = () => {
    setIsCustomHeightWidth(!isCustomHeightWidth);
    setShowCustomHeightWidth(!showCustomHeightWidth);
  };

  return (
    <div className="doors-container px-3">
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h2" className="text-black fw-bold">
            Doors
          </Typography>
          <Typography variant="h6" className="text-black fw-bold">
            <span>Home </span> / <span> Doors</span>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fc5f03",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          height: "50px",
        }}
        className="text-white p-1 rounded-3 doors-title-list"
      >
        <Typography className="title-size" sx={{ fontSize: "15px" }}>
          Select Category <ArrowForwardIosIcon className="fs-6" />
        </Typography>

        {categories.map((category, index) => (
          <Typography
            key={index}
            className="title-size"
            sx={{ fontSize: "15px" }}
          >
            {category}
          </Typography>
        ))}
      </Box>
      <Container className="mb-4">
        <Grid container spacing={4} className="mt-4">
          <Grid item xs={12} md={5}>
            <Box>
              <img
                src={subcategory?.image}
                alt="Main Door"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  maxHeight: "200px",
                }}
              />
              <Grid container spacing={2} sx={{ marginTop: "15px" }}>
                {images.slice(0, maxVisibleImages).map((imageSrc, index) => (
                  <Grid item xs={4} key={index}>
                    <img
                      src={imageSrc}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                ))}
                {remainingImages > 0 && (
                  <Grid
                    item
                    xs={4}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: "#1976d2",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        +{remainingImages}
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography variant="h5" className="fw-bold mt-3">
                Wood Entry Doors
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="w-75 mt-3"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                accumsan et viverra justo commodo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="mb-3"
            >
              <Typography variant="h4" className="fw-bold">
                Pricing
              </Typography>
              <Box>
                <Box
                  sx={{ backgroundColor: "#F5F5F5", width: "200px" }}
                  className="text-white text-center rounded-1"
                >
                  <Typography variant="h4" sx={{ color: "#FF0000", fontWeight:"bold" }}>$ {price}</Typography>
                </Box>
                <Typography sx={{ fontSize: "10px" }}>
                  (According to Selected Options)
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={handleCustomHeightWidthToggle}
              variant="outlined"
              className="fw-bold"
              sx={{ marginBottom: "10px", textTransform: "none" }}
            >
              Add Custom Height & Width
            </Button>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Width <span style={{ fontSize: "10px" }}>(inch)</span>
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="width"
                    value={selectedOptions.width}
                    onChange={handleSelectChange}
                    renderValue={(selected) => selected || "Width"}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                    disabled={isCustomHeightWidth} // Disable select when custom height/width is enabled
                  >
                    <MenuItem value="">
                      <em>Width</em>
                    </MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Height <span style={{ fontSize: "10px" }}>(inch)</span>
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="height"
                    value={selectedOptions.height}
                    onChange={handleSelectChange}
                    renderValue={(selected) => selected || "Height"}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                    disabled={isCustomHeightWidth}
                  >
                    <MenuItem value="">
                      <em>Height</em>
                    </MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {showCustomHeightWidth && (
              <Grid container spacing={2} className="mb-4">
                <Grid item xs={6}>
                  <TextField
                    label="Custom Width (inch)"
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Custom Height (inch)"
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            )}

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Fraction{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="fraction"
                    value={selectedOptions.fraction}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Fraction";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Fraction</em>
                    </MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">Grid </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="grid"
                    value={selectedOptions.grid}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Grid";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Grid</em>
                    </MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Fin Type{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="finType"
                    value={selectedOptions.finType}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Fin Type";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Fin Type</em>
                    </MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Glass Type{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="glassType"
                    value={selectedOptions.glassType}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Glass Type";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Glass Type</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">Color </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="color"
                    value={selectedOptions.color}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Color";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Color</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Tempering Option{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="temperingOption"
                    value={selectedOptions.temperingOption}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Tempering Option";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Tempering Option</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Side Window Opens{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="sideWindowOpens"
                    value={selectedOptions.sideWindowOpens}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Side Window Opens";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Side Window Opens</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Installation for San Diego. For installation in other areas,
                  please contact us.
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ margin: "20px 0" }} />
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Installation Option{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="installationOption"
                    value={selectedOptions.installationOption}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Installation Option";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Installation Option</em>
                    </MenuItem>
                    <MenuItem value={10}>20</MenuItem>
                    <MenuItem value={24}>5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel className="fw-bold text-black">
                  Instruction, Questions or Comments?
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    name="instructions"
                    value={selectedOptions.instructions}
                    onChange={handleSelectChange}
                    renderValue={(selected) => {
                      return selected ? selected : "Instructions";
                    }}
                    sx={{
                      backgroundColor: "#D0E5F4",
                      borderRadius: "10px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },  
                    }}
                  >
                    <MenuItem value="">
                      <em>Instructions</em>
                    </MenuItem>
                    <MenuItem value={10}>20</MenuItem>
                    <MenuItem value={24}>5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }} className="mb-5 mt-5">
          <Link to="/measured-doors">
            <Button variant="contained" size="large">
              Proceed <ArrowForwardIcon />
            </Button>
          </Link>
        </Box>

        {content.articles.map((article, index) => (
          <Box className="mt-3" key={index}>
            <Typography variant="h5" className="fw-bold">
              {article.title}
            </Typography>
            <Typography variant="subtitle1">{article.content}</Typography>
          </Box>
        ))}
      </Container>
    </div>
  );
};
