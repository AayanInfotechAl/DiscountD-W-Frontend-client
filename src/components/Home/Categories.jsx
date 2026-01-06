import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import banner from "../../assets/doors.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import Loader from "../../loader/Loader";
import ImageCard from "./ImageCard";

const Categories = () => {
  const [exploreCategories, setExploreCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const { categoryId } = useParams();
  const location = useLocation();

  const { categoryName } = location.state || {};

  const navigate = useNavigate();

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .slice(0, -1)
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const fetchExploreSubCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/subcategory/categoryid/${categoryId}`
      );
      if (response?.data?.status === 200) {
        setExploreCategories(response?.data?.data);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchExploreSubCategories();
    }
  }, [categoryId]);

  // const handleClick = (category) => {
  //   console.log(category?.name, "category----  categoryName: category?.name")
  //   if (category?.type === "category") {
  //     navigate(`/categories/${category?._id}`);
  //   } else if (category?.type === "subCategory" && !category?.isSubSubcategory) {
  //     navigate(`/allsubproducts/${category?._id}`, { state: { categorydetails: category }, });
  //   } else if (category?.isSubSubcategory) {
  //     navigate(`/sub-sub-categories/${category?._id}`, { state: { categorydetails: category }, });
  //   } else {
  //     console.log("Invalid category type", category);
  //   }
  // };

  const handleClick = (category) => {
    const categoryState = { categorydetails: category, categoryName: category?.name };
    if (category?.type === "category") {
      navigate(`/categories/${category?._id}`, { state: categoryState });
    } else if (category?.type === "subCategory" && !category?.isSubSubcategory) {
      navigate(`/allsubproducts/${category?._id}`, { state: categoryState });
    } else if (category?.isSubSubcategory) {
      navigate(`/sub-sub-categories/${category?._id}`, { state: categoryState });
    } else {
      console.log("Invalid category type", category);
    }
  };


  return (
    <div className="doors-container px-3 mb-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", }}>
            <Box>
              {exploreCategories?.map((category, index) => (
                <Typography key={index} variant="h5" className="text-black fw-bold">
                  {category.subcategoryName}
                </Typography>
              ))}
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)} {">"} {categoryName}
                </span>
              </Typography>
            </Box>
          </Box>
          <Container maxWidth="false" sx={{ mt: 4 }}>
            {errorMessage ? (
              <Typography variant="h6" color="error" textAlign="center" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {(showAll ? exploreCategories : exploreCategories.slice(0, 8)).map((category, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    {/* <Box sx={{ borderRadius: "10px", overflow: "hidden", textAlign: "center", position: "relative", backgroundColor: "#f1f1f1", width: "100%", cursor: "pointer", }} className="rounded-3 p-2" onClick={() => handleClick(category)}>
                      <Box component="img" className="p-3" src={category?.images || No_Image_Available} alt={category?.name} sx={{ width: "100%", height: "300px", objectFit: "contain", }} onError={(e) => { e.target.onerror = null; e.target.src = No_Image_Available; }} />
                      <p className="fw-bold">
                        {category?.name || "N/A"}
                      </p>
                    </Box> */}
                    <ImageCard category={category} onClick={handleClick} />
                  </Grid>
                ))}
              </Grid>
            )}

            {exploreCategories.length > 8 && (
              <Box textAlign="center" mt={2}>
                <Button variant="outlined" sx={{ fontWeight: "bold", color: "#ff6600", borderColor: "#ff6600", textTransform: "capitalize" }} onClick={() => setShowAll((prev) => !prev)}>
                  {showAll ? "Show Less" : "Show All"}
                </Button>
              </Box>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default Categories;
