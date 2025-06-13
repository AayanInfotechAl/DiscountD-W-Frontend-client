import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import banner from "../../assets/doors.png";
import { replace, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
// import Loader from "../../loader/Loader";

const DoorsCategoryTypes = () => {
  const [exploreCategories, setExploreCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const doostypecategory = [
    {
      _id: "101",
      categoryName: "Interior Doors",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjdiXK26r9eysPLboj92ltSWeZEgH89xQ4w&s",
      subCategory: [
        {
          _id: "201",
          subCategoryName: "Rounded glass doors",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Dm1bqf6GXSBh7uU5A2YfZv23IM1K6_IBaw&s",
          subsubCategoryDoors: [],
        },
      ],
    },
    {
      _id: "102",
      categoryName: "Multiple Slide & Bifold Doors",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxYrB049wV9DquvEqTCMdbb1vNtkKTwJVoQ&s",
      subCategory: [
        {
          _id: "201",
          subCategoryName: "Pocket Sliding Doors",
          image:
            "https://cdn.shopify.com/s/files/1/0621/2472/0359/files/Pocket_Sliding_Door_480x480.webp?v=1681278076",
          subsubCategoryDoors: [
            {
              _id: "301",
              sub_sub_categoryName: "Barn Doors",
              image:
                "https://cdn.shopify.com/s/files/1/0621/2472/0359/files/Barn_Doors_480x480.webp?v=1681277757",
              isSubCategory: true,
            },
          ],
        },
      ],
    },
    {
      _id: "103",
      categoryName: "Entry Doors",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf02Hf4bUd3bT-WzOeiJ-PNWqoOXN7TeLZOQ&s",
      subCategory: [
        {
          _id: "201",
          subCategoryName: "Pocket Sliding Doors",
          image:
            "https://cdn.shopify.com/s/files/1/0621/2472/0359/files/Pocket_Sliding_Door_480x480.webp?v=1681278076",
          subsubCategoryDoors: [],
        },
      ],
    },
    {
      _id: "104",
      categoryName: "Sliding Doors",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyW1RSrxF43Ciye_2uX8BvYStxz42K2pacZQ&s",
      subCategory: [
        {
          _id: "201",
          subCategoryName: "Bi-Folding Doors",
          image:
            "https://anthonyinnovations.com.au/wp-content/uploads/2021/02/bifolding-doors.jpg",
          subsubCategoryDoors: [],
        },
      ],
    },
  ];

  const formatPath = (path) => {
    const replacements = { doorscategorytypes: "Doors Type" };
    return path
      .split("/")
      .filter(Boolean)
      .map(
        (segment) =>
          replacements[segment.toLowerCase()] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const handleClick = (category) => {
    navigate("/subDoorsCategory", { state: { subcategory: category } });
  };

  return (
    <div className="doors-container px-3 mb-4">
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
          {exploreCategories?.map((category, index) => (
            <Typography key={index} variant="h5" className="text-black fw-bold">
              {category.subcategoryName}
            </Typography>
          ))}
          <Typography variant="h6" className="text-black fw-bold">
            <span>
              Doors {">"} {formatPath(location.pathname)}
            </span>
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {doostypecategory?.map((category, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  textAlign: "center",
                  position: "relative",
                  backgroundColor: "#f1f1f1",
                  width: "100%",
                }}
                className="rounded-3 p-2"
                onClick={() => handleClick(category)}
              >
                <Box
                  component="img"
                  className="p-3"
                  src={category.image || No_Image_Available}
                  alt="dlkh"
                  sx={{ width: "100%", height: "300px", objectFit: "fill" }}
                />
                <Typography variant="h5" className="fw-bold">
                  {category?.categoryName}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default DoorsCategoryTypes;
