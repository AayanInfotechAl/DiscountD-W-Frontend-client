import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import banner from "../../assets/doors.png";
import Loader from "../../loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const WishList = () => {
  const [allWishList, setAllWishList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userLoggedInId = Cookies.get("userLoggedInId");
  const alanAuthToken = Cookies.get("alanAuthToken");
  const navigate = useNavigate();
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

  const fetchAllWishList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/wishlist/user/${userLoggedInId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alanAuthToken}`,
          },
        }
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setAllWishList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToRemoveWishList = async (wishlistId) => {
    try {
      const response = await axios.delete(
        `https://www.discountdoorandwindow.com/api/wishlist/DEL/${wishlistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alanAuthToken}`,
          },
        }
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        alert(response?.data?.message || "Removed from wishlist successfully!");
        fetchAllWishList();
      } else {
        alert(response?.data?.message || "Failed to remove from wishlist.");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (userLoggedInId) {
      fetchAllWishList();
    }
  }, [userLoggedInId]);

  const handleClick = (wishlistId) => {
    navigate(`/dimensions/${wishlistId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              <Typography variant="h2" className="text-black fw-bold">
                Wishlist
              </Typography>
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>

          <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {allWishList?.map((wishlist, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      textAlign: "center",
                      position: "relative",
                      backgroundColor: "#f1f1f1",
                      width: "100%",
                      cursor:"pointer"
                    }}
                    className="rounded-3 p-2"
                    onClick={() => handleClick(wishlist?.product_id?._id)}
                  >
                    <Box
                      component="img"
                      className="p-3"
                      src={wishlist?.product_id?.images || No_Image_Available}
                      alt={wishlist?.product_id?.name}
                      sx={{
                        width: "100%",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                    <p className="fw-bold mb-0">
                      {wishlist?.product_id?.name
                        ? wishlist?.product_id?.name
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())
                        : "N/A"}
                      &nbsp;&nbsp;
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToRemoveWishList(wishlist?._id);
                        }}
                      >
                        <FavoriteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </p>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};
