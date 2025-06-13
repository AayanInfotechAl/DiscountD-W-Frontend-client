import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import banner from "../../assets/doors.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import Loader from "../../loader/Loader";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Cookies from "js-cookie";

const AllSubProducts = () => {
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { products_id } = useParams();
  const location = useLocation();
  const { categorydetails } = location.state || {};
  const userLoggedInId = Cookies.get("userLoggedInId");
  const alanAuthToken = Cookies.get("alanAuthToken");

  const navigate = useNavigate();
  let debounceTimer;

  const formatPath = (path) => {
    const pathMapping = {
      allsubproducts: "Products",
    };
    return path
      .split("/")
      .filter(Boolean)
      .slice(0, -1)
      .map(
        (segment) =>
          pathMapping[segment.toLowerCase()] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const fetchExploreSubCategories = async () => {
    setLoading(true);
    try {
      let response;
      if (categorydetails?.type === "category") {
        response = await axios.get(
          `https://www.discountdoorandwindow.com/api/products/type/category/id/${products_id}`
        );
      } else if (categorydetails?.type === "subSubCategory") {
        response = await axios.get(
          `https://www.discountdoorandwindow.com/api/products/type/subSubCategory/id/${products_id}`
        );
      } else if (categorydetails?.type === "subCategory") {
        response = await axios.get(
          `https://www.discountdoorandwindow.com/api/products/type/subCategory/id/${products_id}`
        );
      } else {
        setErrorMessage("Invalid category type.");
        return;
      }
      if (response?.data?.status === 200) {
        setSubsubCategories(response?.data?.data);
        setErrorMessage("");
      } else {
        setErrorMessage(response?.data?.message);
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query, productId) => {
    if (!query.trim()) {
      fetchExploreSubCategories();
      return;
    }
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/products/search?name=${query}`
      );
      if (response?.data?.status === 200) {
        setSubsubCategories(response?.data?.data || []);
        setErrorMessage("");
      } else {
        setSubsubCategories([]);
        setErrorMessage(response?.data?.message || "No products found.");
      }
    } catch (error) {
      setSubsubCategories([]);
      setErrorMessage(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  useEffect(() => {
    if (products_id) {
      fetchExploreSubCategories();
    }
  }, [products_id]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchSearchResults(query, products_id);
    }, 500);
  };

  const handleWishList = async (productId) => {
    if (!userLoggedInId || !alanAuthToken) {
      setOpenSnackbar(true);
      setSnackbarMessage("Please log in first to add items to your wishlist.");
      return;
    }
    try {
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/wishlist",
        {
          product_id: productId,
          user_id: userLoggedInId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alanAuthToken}`,
          },
        }
      );
      if (response?.data?.status === 200) {
        alert(response?.data?.message || "Added to wishlist successfully!");
      } else {
        alert(response?.data?.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const handleClick = (category) => {
    navigate(`/dimensions/${category?._id}`);
  };

  return (
    <div className="doors-container px-3 mb-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", }}>
            <Box>
              {subsubCategories?.map((category, index) => (
                <Typography key={index} variant="h5" className="text-black fw-bold">
                  {category.subcategoryName}
                </Typography>
              ))}
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>
          <Container maxWidth="false" sx={{ mt: 4 }}>
            <Box className="text-end mb-3">
              <TextField id="outlined-basic" variant="outlined" value={searchQuery} onChange={handleSearch} placeholder="Search Product Name" InputProps={{ endAdornment: (<InputAdornment position="end">        <SearchIcon />      </InputAdornment>), }} />
            </Box>
            {errorMessage ? (
              <Typography variant="h6" color="error" textAlign="center" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {/* {subsubCategories?.map((category, index) => ( */}
                {(showAll ? subsubCategories : subsubCategories.slice(0, 8)).map((category, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ borderRadius: "10px", overflow: "hidden", textAlign: "center", position: "relative", backgroundColor: "#f1f1f1", width: "100%", cursor: "pointer" }} className="rounded-3 p-2" onClick={() => handleClick(category)}>
                      <Box component="img" className="p-3" src={category?.images[0] || No_Image_Available} alt={category?.name} sx={{ width: "100%", height: "300px", objectFit: "contain", }} />
                      <p className="fw-bold mb-0">
                        {category?.name ? category?.name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "N/A"}&nbsp;&nbsp;
                        <IconButton onClick={(e) => { e.stopPropagation(); handleWishList(category?._id); }}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </p>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {subsubCategories.length > 8 && (
              <Box textAlign="center" mt={2}>
                <Button variant="outlined" sx={{ fontWeight: "bold", color: "#ff6600", borderColor: "#ff6600", textTransform: "capitalize" }} onClick={() => setShowAll((prev) => !prev)}>
                  {showAll ? "Show Less" : "Show All"}
                </Button>
              </Box>
            )}
          </Container>
        </>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllSubProducts;
