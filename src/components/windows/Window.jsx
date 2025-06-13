import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  SnackbarContent,
  IconButton,
  TextField,
  Rating,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import banner from "../../assets/doors.png";
import card_img1 from "../../assets/window.png";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../loader/Loader";
// import WindowContent from "./WindowContent";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import LinearProgress from "@mui/material/LinearProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import {
  addtocartproduct,
  fetchAllProducts,
} from "../redux/slices/addToCartSlice";
import Cookies from "js-cookie";
import useSessionId from "../../hooks/useSessionId";
import CloseIcon from "@mui/icons-material/Close";
import { showErrorToast, showSuccessToast } from '../toastMessage/Toast';
import ImageZoom from "./ImageZoom";

const customStyles = {
  outline: "none",
  boxShadow: "none",
  borderColor: "inherit",
  backgroundColor: "#D0E5F4",
  border: 0,
};

const Window = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // const [selectedImage, setSelectedImage] = useState(card_img1);
  const [customDimensions, setCustomDimensions] = useState({
    height: "",
    width: "",
  });

  const [currentProductDetails, setCurrentProductDetails] = useState({});
  const [currentProductDimensions, setCurrentProductDimensions] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [customPrice, setCustomPrice] = useState(null);
  const [gardenWindowUpdatedPrice, setGardenWindowUpdatedPrice] = useState(null);
  const [formError, setFormError] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCalculatingGardenWindow, setIsCalculatingGardenWindow] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [dimensionError, setDimensionError] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const token = Cookies.get("alanAuthToken");
  const location = useLocation();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const sessionId = useSessionId();
  const userLoggedInId = Cookies.get("userLoggedInId");

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => {
        if (
          segment.toLowerCase() === "dimensions" &&
          index === array.length - 2
        ) {
          return "Product Dimensions";
        }
        if (index === array.length - 1 && /^[a-f0-9]{24}$/i.test(segment)) {
          return null;
        }
        return segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      })
      .filter(Boolean)
      .join(" > ");
  };

  const fetchProductsByDimensions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/dims/ProductID/${product_id}`);
      if (response?.data?.success) {
        setSelectedImage(response.data.data?.product?.images[0]);
        setCurrentProductDetails(response.data.data);
        setCurrentProductDimensions(response?.data?.data?.Dimensions);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchProductsByDimensions();
    }
  }, [product_id]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setCustomDimensions((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "height" || name === "width") {
      const { height, width } = { ...customDimensions, [name]: value };
      if (height && width) {
        setFormError(false);
        setIsCalculating(true);
        setDimensionError(null);
        try {
          const response = await axios.post(
            "https://www.discountdoorandwindow.com/api/prodFormula/calculateCustomHeightWidth",
            {
              width: parseFloat(width),
              height: parseFloat(height),
              Product_id: product_id,
              Price: currentProductDetails?.product?.price || 0,
            }
          );
          if (response?.data?.success === false) {
            setDimensionError(response?.data?.message || "Invalid dimensions.");
            setCustomPrice(null);
          } else {
            setCustomPrice(response.data.data.totalPrice);
            setDimensionError(null); // Clear error on success
          }
        } catch (error) {
          setCustomPrice(null);
        } finally {
          setIsCalculating(false);
        }
      } else {
        setFormError(true);
      }
    }
  };

  const handleSelectChange = async (category, value, name) => {
    const updatedOptions = {
      ...selectedOptions,
      [category]: { value, name },
    };
    setSelectedOptions(updatedOptions);
    // ----------------------------new code----------------------------------------
    if (category === "TemperingOption" || category === "Grid") {
      const { height, width } = customDimensions;
      if (height && width) {
        setFormError(false);
        setIsCalculating(true);
        setDimensionError(null);
        const payload = {
          width: parseFloat(width),
          height: parseFloat(height),
          Product_id: product_id,
          Price: currentProductDetails?.product?.price || 0,
        };

        if (category === "TemperingOption") {
          payload.TemperingOption = name;
          if (updatedOptions?.Grid?.name) {
            payload.Grid = updatedOptions.Grid.name;
          }
        } else if (category === "Grid") {
          payload.Grid = name;
          if (updatedOptions?.TemperingOption?.name) {
            payload.TemperingOption = updatedOptions.TemperingOption.name;
          }
        }
        try {
          const response = await axios.post(
            "https://www.discountdoorandwindow.com/api/prodFormula/calculateCustomHeightWidth", payload
            // {
            //   width: parseFloat(width),
            //   height: parseFloat(height),
            //   Product_id: product_id,
            //   Price: currentProductDetails?.product?.price || 0,
            //   TemperingOption: name,
            //   Grid: name
            // }
          );
          if (response?.data?.success === false) {
            setDimensionError(response?.data?.message || "Invalid dimensions.");
            setCustomPrice(null);
          } else {
            setCustomPrice(response.data.data.totalPrice);
            setDimensionError(null);
          }
        } catch (error) {
          console.error(error);
          setCustomPrice(null);
        } finally {
          setIsCalculating(false);
        }
      } else {
        setFormError(true);
      }
    }
    // ----------------------------new code upto here----------------------------------------
    const color = updatedOptions["Color"]?.name;
    const widthHeight = updatedOptions["widthHeight"]?.name;
    if (currentProductDetails?.product?.name === "Garden_window" && color && widthHeight) {
      setIsCalculatingGardenWindow(true);
      try {
        const response = await axios.put("https://www.discountdoorandwindow.com/api/dimsColor/updateAmount", {
          Color: color,
          widthHeight: widthHeight,
          amount: currentProductDetails.product.price || 0,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
        if (response?.data?.success) {
          const updatedPrice = response?.data?.data?.totalAmount;
          setGardenWindowUpdatedPrice(updatedPrice || 0);
        }
      } catch (error) {
        console.error("Error updating price:", error);
      } finally {
        setIsCalculatingGardenWindow(false);
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(currentProductDetails?.images?.[0] || card_img1);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleChangeImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const calculatePrice = () => {
    if (!currentProductDetails?.product) return "0.00";
    if (gardenWindowUpdatedPrice) {
      return gardenWindowUpdatedPrice.toFixed(2);
    }
    let basePrice = parseFloat(
      customPrice || currentProductDetails.product.price || 0
    );
    if (customPrice) {
      basePrice = parseFloat(customPrice);
    }
    Object.keys(selectedOptions).forEach((category) => {
      const selectedOption = selectedOptions[category];
      if (currentProductDimensions && currentProductDimensions[category]) {
        const selectedItem = currentProductDimensions[category].find(
          (item) => item[category] === selectedOption.name
        );
        if (selectedItem) {
          const value = selectedItem.value;
          if (value === "" || value === null) {
            basePrice += parseFloat(selectedItem.amount);
          } else {
            const percentage = parseFloat(selectedItem.value);
            basePrice += (basePrice * percentage) / 100;
          }
        }
      }
    });
    return basePrice.toFixed(2);
  };

  const handleToProceedAddToCart = async () => {
    setBtnLoader(true);
    if (!userLoggedInId && !sessionId) {
      setSnackbarMessage("Session ID is required for guest checkout.");
      setOpenSnackbar(true);
      setBtnLoader(false);
      return;
    }
    const totalPrice = calculatePrice();
    const productDetails = {
      totalPrice,
      product_price: currentProductDetails?.product?.price || 0,
      product_id: currentProductDetails?.product?._id || "",
      name: currentProductDetails?.product?.name || "",
      sku: currentProductDetails?.product?.sku || "",
      images: currentProductDetails?.product?.images || [],
      selectedOptions,
      customDimensions, ...(userLoggedInId
        ? { user_id: userLoggedInId }
        : { session_id: sessionId }),
    };
    try {
      const response = await dispatch(addtocartproduct(productDetails)).unwrap();
      if (response?.success === false && response?.status === 404) {
        setSnackbarMessage(response?.message || "Failed to add item to cart.")
      } else {
        const responseMessage = response?.message || "Item added to cart successfully!";
        setSnackbarMessage(responseMessage);
        setOpenSnackbar(true);
        dispatch(fetchAllProducts());
        setSelectedOptions({});
        setCustomDimensions({ height: "", width: "" });
        setCustomPrice(null);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      setSnackbarMessage(errorMessage);
    } finally {
      setOpenSnackbar(true);
      setBtnLoader(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const maxReviewLength = 300;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      showErrorToast("Please enter a review before submitting.");
      return;
    }
    if (rating === 0) {
      showErrorToast("Please select a rating before submitting.");
      return;
    }
    setBtnLoading(true);
    try {
      const response = await axios.post("https://www.discountdoorandwindow.com/api/ratings", {
        productId: currentProductDetails?.product?._id,
        rating,
        review,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        // showSuccessToast("Review submitted!");
        setRating(0);
        setReview("");
      } else {
        showErrorToast(`Error: ${response.statusText}`);
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Network error. Please try again later.";
      showErrorToast(`Error: ${errMsg}`);
    } finally {
      setBtnLoading(false);
    }
  };

  const cleanDescription = (html) => {
    return html?.replace(/<img[^>]*>/g, "");
  };

  // Function to extract first image src
  const extractAllImages = (html) => {
    if (!html) return null;
    const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
    return imgMatches.map(match => match[1]);
  };

  const imageSrcList = extractAllImages(currentProductDetails?.product?.Description);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const reviews = currentProductDetails?.product_reviews || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 = 1-star, Index 4 = 5-star
  reviews.forEach((r) => {
    const i = Math.floor(r.rating) - 1;
    if (i >= 0 && i < 5) ratingCounts[i]++;
  });

  const total = reviews.length;
  const visibleReviews = showAllReviews ? currentProductDetails?.product_reviews : currentProductDetails?.product_reviews?.slice(0, 5);

  return (
    <div className="doors-container px-3">
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <SnackbarContent message={snackbarMessage} style={{ backgroundColor: "#4caf50", color: "#fff", }} action={<IconButton size="small" color="inherit" onClick={handleCloseSnackbar}    >      <CloseIcon fontSize="small" />    </IconButton>} />
      </Snackbar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", }}>
            <Box>
              <Typography variant="h2" className="text-black fw-bold">
                Products
              </Typography>
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>
          {(isCalculating || isCalculatingGardenWindow) && (
            <LinearProgress sx={{ marginBottom: 2 }} />
          )}
          <Container className="mb-4">
            <div className="row gy-3 gy-md-4 my-2">
              <div className="col-12 col-md-5">
                <Box>
                  <ImageZoom src={hoveredImage || selectedImage} fallback={No_Image_Available} />
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 2,
                      marginTop: "15px",
                      scrollbarWidth: "thin", '&::-webkit-scrollbar': { height: '6px', },
                      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px', },
                      '&::-webkit-scrollbar-track': { backgroundColor: 'transparent', },
                    }}
                  >
                    {currentProductDetails?.images?.length > 0 ? (
                      currentProductDetails.images.map((img, index) => (
                        <Box key={index} sx={{ minWidth: 100, flexShrink: 0 }} onClick={() => setSelectedImage(img)} onMouseEnter={() => setHoveredImage(img)} onMouseLeave={() => setHoveredImage(null)}>
                          {!loadedImages[img] && (
                            <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: "5px" }} />
                          )}
                          <img src={img} alt={`Product Image ${index + 1}`} style={{
                            display: loadedImages[img] ? "block" : "none",
                            width: "100px", height: "100px", borderRadius: "5px", objectFit: "contain", cursor: "pointer",
                            border: selectedImage === img && !hoveredImage ? "2px solid #1976d2" : "2px solid transparent", transition: "border 0.2s ease",
                          }}
                            onLoad={() => setLoadedImages((prev) => ({ ...prev, [img]: true }))}
                            onError={(e) => { e.target.onerror = null; e.target.src = No_Image_Available; setLoadedImages((prev) => ({ ...prev, [img]: true })); }}
                          />
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ minWidth: 100 }}>
                        <img src={No_Image_Available} alt="No image available" style={{ width: "100px", height: "100px", borderRadius: "5px", objectFit: "contain", }} />
                      </Box>
                    )}
                  </Box>
                  <Typography variant="h5" className="fw-bold mt-3">
                    {currentProductDetails?.product?.name ? currentProductDetails.product?.name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "N/A"}
                  </Typography>
                </Box>
              </div>
              <div className="col-12 col-md-7">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Typography variant="h4" className="fw-bold">
                    Pricing
                  </Typography>
                  <Box>
                    <Box sx={{ backgroundColor: "#F5F5F5", width: "200px" }} className="text-white text-center rounded-1 p-2">
                      <Typography variant="h5" sx={{ color: "#FF0000", fontWeight: "bold" }}>
                        ${calculatePrice()}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "10px" }}>
                      (According to Selected Options)
                    </Typography>
                  </Box>
                </div>
                {currentProductDetails?.product?.productFormulaAdded?.toLowerCase() !==
                  "no" && (
                    <div className="row ma-0 gy-3 mb-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="width" className="fw-bold mb-2">
                          Width <span style={{ fontSize: "10px" }}>(inch)</span>
                        </label>
                        <input type="number" id="width" name="width" value={customDimensions.width} onChange={handleInputChange} className="form-control p-3" placeholder="Enter width" style={customStyles} />
                        {formError && !customDimensions.width && (
                          <Typography variant="body2" sx={{ color: "red", fontSize: "12px" }}>
                            Width is required for price calculation.
                          </Typography>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="height" className="fw-bold mb-2">
                          Height <span style={{ fontSize: "10px" }}>(inch)</span>
                        </label>
                        <input type="number" id="height" name="height" value={customDimensions.height} onChange={handleInputChange} className="form-control p-3" placeholder="Enter height" style={customStyles} />
                        {formError && !customDimensions.height && (
                          <Typography variant="body2" sx={{ color: "red", fontSize: "12px" }}>
                            Height is required for price calculation.
                          </Typography>
                        )}
                      </div>
                    </div>
                  )}
                {dimensionError && (
                  <div className="col-12 mb-3">
                    <Typography variant="body2" sx={{ color: "red", fontSize: "14px" }}>
                      {dimensionError}
                    </Typography>
                  </div>
                )}
                <div className="row ma-0 gy-3">
                  {currentProductDimensions &&
                    Object.keys(currentProductDimensions).map((category) => (
                      <div className="col-12 col-md-6" key={category}>
                        <label htmlFor={`select-${category}`} className="form-label fw-semibold mb-2">
                          {category.charAt(0).toUpperCase() + category.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </label>
                        <select
                          className="form-select p-3"
                          style={customStyles}
                          aria-label={`Select ${category}`}
                          onChange={(e) => handleSelectChange(category, e.target.value, e.target.selectedOptions[0].text)}
                        >
                          <option>
                            Select{" "}
                            {category.charAt(0).toUpperCase() + category.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                          </option>
                          {currentProductDimensions[category].map((item) => (
                            <option key={item._id} value={item.value}>
                              {item[category]}
                            </option>
                          ))}
                        </select>
                        {category === "installation" && (
                          <Typography variant="body2" className="mb-2 text-danger fw-bold">
                            Installation for San Diego. For installation in
                            other areas, please contact us.
                          </Typography>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <Box sx={{ textAlign: "center" }} className="my-4">
              <Button variant="contained" size="large" onClick={handleToProceedAddToCart} sx={{ textTransform: "none" }} disabled={btnLoader}>
                {btnLoader ? (
                  <span>Adding...</span>
                ) : (
                  <span>
                    Add To Cart&nbsp;&nbsp;
                    <ShoppingCartIcon className="fs-5" style={{ marginLeft: "8px" }} />
                  </span>
                )}
              </Button>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ my: 2 }} fontWeight="bold" gutterBottom>
                Product Details
              </Typography>
              <div className="row">
                <div className="col-12 col-md-8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cleanDescription(
                        currentProductDetails?.product?.Description || "N/A"
                      ),
                    }}
                  />
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                  {imageSrcList.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Product ${index + 1}`}
                      className="img-fluid rounded mb-2"
                      style={{ height: "250px", objectFit: "contain", width: "100%" }}
                    />
                  ))}
                </div>
              </div>
            </Box>

            {total > 0 && (
              <div className="">
                <Typography variant="h4" sx={{ my: 2 }} fontWeight="bold" gutterBottom>
                  Our Customer Reviews
                </Typography>
                <div className="row my-4">
                  <div className="col-md-4 text-center">
                    <h1 className="display-4 fw-bold">{averageRating.toFixed(1)}</h1>
                    <div>
                      <Rating value={averageRating} precision={0.5} readOnly />
                    </div>
                    <p className="text-muted">({total} Review{total !== 1 ? 's' : ''})</p>
                  </div>
                  <div className="col-md-8">
                    {[5, 4, 3, 2, 1].map((star, index) => {
                      const count = ratingCounts[star - 1] || 0;
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div className="d-flex align-items-center mb-2" key={index}>
                          <div style={{ width: "60px" }} className="text-end pe-2">
                            <span className="small">{star} stars</span>
                          </div>
                          <div className="flex-grow-1">
                            <div className="progress" style={{ height: "6px", borderRadius: "5px" }}>
                              <div className={`progress-bar ${star === 5 ? "bg-success" : star === 4 ? "bg-primary" : star === 3 ? "bg-info" : star === 2 ? "bg-warning" : "bg-danger"}`} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" />
                            </div>
                          </div>
                          <div style={{ width: "30px" }} className="ps-2 small text-muted">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {currentProductDetails?.product_reviews?.length > 0 ? (
                  <>
                    {visibleReviews.map((review) => (
                      <div className="mb-4" key={review?._id}>
                        <h5 className="fw-bold">{review?.userName}</h5>
                        <p className="text-muted small mb-0">{formatDate(review?.createdAt)}</p>
                        <p className="mb-2">{review?.review}</p>
                        <Rating value={review?.rating} precision={0.5} readOnly />
                      </div>
                    ))}
                    {currentProductDetails?.product_reviews.length > 5 && (
                      <div className="mt-3">
                        <button className="btn btn-link btn-sm" onClick={() => setShowAllReviews(!showAllReviews)}>
                          {showAllReviews ? "See Less" : "See More"}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted">No reviews available at the moment.</p>
                )}
              </div>
            )}

            {/* ---------------------------Review Section--------------------------- */}
            {token && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Leave a Review
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField label="Your Review" fullWidth multiline rows={4} value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <Typography
                      variant="caption"
                      color={review.length > maxReviewLength ? 'error' : 'textSecondary'}
                    >
                      {maxReviewLength - review.length} characters remaining
                    </Typography>
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
                  </Box>
                  <Button type="submit" variant="contained"
                    disabled={btnLoading || !review.trim() || rating === 0 || review.length > maxReviewLength} >
                    {btnLoading ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </Box>
            )}
          </Container>
          {/* <WindowContent /> */}
        </>
      )}
    </div>
  );
};
export default Window;
