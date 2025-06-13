import React, { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/doors.png";
import No_Image_Available from "../../assets/No_Image_Available.jpg";

const SubDoorsCategory = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { subcategory } = location.state || {};
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleSubCategoryClick = (category) => {
    if (!category.subsubCategoryDoors?.length) {
      navigate("/doors", {
        state: { subcategory: category}
      });
    } else {
      setSelectedSubCategory(category);
    }
  };
  const handleSubSubCategoryClick = (subsubCategory) => {
    navigate("/doors", {
      state: {
        subcategory: selectedSubCategory.subCategoryName,
        subsubcategory: subsubCategory.sub_sub_categoryName,
      },
    });
  };

  const handleBack = () => {
    setSelectedSubCategory(null);
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
          <Typography variant="h6" className="text-black fw-bold">
            <span>
              Sub Category Doors {">"} {subcategory?.categoryName}
            </span>
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mt: 4 }}>
        {!selectedSubCategory ? (
          <Grid container spacing={2}>
            {subcategory?.subCategory?.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                  onClick={() => handleSubCategoryClick(category)}
                >
                  <Box
                    component="img"
                    className="p-3"
                    src={category.image || No_Image_Available}
                    alt={category.subCategoryName}
                    sx={{ width: "100%", height: "300px", objectFit: "fill" }}
                  />
                  <Typography variant="h5" className="fw-bold">
                    {category?.subCategoryName}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Button variant="outlined" onClick={handleBack}>
              Back to Subcategories
            </Button>
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              Sub-sub Categories for "{selectedSubCategory.subCategoryName}"
            </Typography>
            <Grid container spacing={2}>
              {selectedSubCategory.subsubCategoryDoors?.length > 0 ? (
                selectedSubCategory.subsubCategoryDoors.map((subsubCategory, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
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
                      onClick={() => handleSubSubCategoryClick(subsubCategory)}
                    >
                      <Box
                        component="img"
                        className="p-3"
                        src={subsubCategory.image || No_Image_Available}
                        alt={subsubCategory.sub_sub_categoryName}
                        sx={{
                          width: "100%",
                          height: "300px",
                          objectFit: "fill",
                        }}
                      />
                      <Typography variant="h5" className="fw-bold">
                        {subsubCategory.sub_sub_categoryName}
                      </Typography>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography>No Sub-sub Categories Available</Typography>
              )}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default SubDoorsCategory;
