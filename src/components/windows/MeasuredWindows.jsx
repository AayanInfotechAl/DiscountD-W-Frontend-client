import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  Snackbar,
  Alert,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const MeasuredWindows = () => {
  const [isNotLoggedIn, setisNotLoggedIn] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedImage } = location.state || {};

  useEffect(() => {
    const storedData = localStorage.getItem("allSelectedOptionsDetails");

    if (storedData) {
      setStoredData(JSON.parse(storedData));
    }
  }, []);

const isLoggedIn = Cookies.get("alanAuthToken") && Cookies.get("userLoggedInId");

  const handleToProceedCart = () => {
    if (isLoggedIn) {
      const selectedOptionsDetails = {
        price: storedData?.totalPrice,
        selectedImage: storedData?.selectedImage,
        getEstimation: storedData?.selectedOptions,
        customDimensions: storedData?.customDimensions,
      };
      navigate("/cart", { state: selectedOptionsDetails });
    } else {
      setisNotLoggedIn(true);
      // setOpenSnackbar(true);
    }
  };
  const handleCloseModal = () => {
    setisNotLoggedIn(false);
  };

  if (!storedData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="mt-4">
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="text-center">
                <img
                  src={selectedImage || No_Image_Available}
                  alt="Window"
                  height="300"
                  style={{ maxWidth: "100%", height: "300" }}
                />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ mt: 2 }} className="fw-bold">
                  {storedData.currentProductDetails?.product?.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                  dangerouslySetInnerHTML={{
                    __html:
                      storedData.currentProductDetails?.product?.Description ||
                      "N/A",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ padding: "20px" }}>
                <Grid container spacing={2}>
                  {storedData.customDimensions?.height &&
                    storedData.customDimensions?.width &&
                    Object.entries(storedData.customDimensions).map(
                      ([key, value], index) => (
                        <Grid item xs={6} key={index}>
                          <Typography variant="h6">
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                          </Typography>
                          <Typography variant="body1">
                            <strong className="fs-5">{value || "N/A"}</strong>
                          </Typography>
                        </Grid>
                      )
                    )}

                  {storedData.selectedOptions &&
                    Object.entries(storedData.selectedOptions).map(
                      ([key, { value, name }], index) => (
                        <Grid item xs={6} key={index}>
                          <Typography variant="h6">
                            {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                          </Typography>
                          <Typography variant="body1">
                            <strong className="fs-5">{name || "N/A"}</strong>
                          </Typography>
                        </Grid>
                      )
                    )}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* ------------------Pricing Section------------------------------- */}
          <Grid
            container
            rowSpacing={1}
            marginTop={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="mb-4"
          >
            <Grid item xs={6}>
              <Typography variant="h6">
                Pricing (According to selected options)
              </Typography>
            </Grid>
            <Grid item xs={6} className="text-end">
              <Button
                variant="contained"
                className="fw-bold me-3"
                sx={{
                  width: "150px",
                  backgroundColor: "black",
                  fontSize: "17px",
                }}
              >
                ${storedData.totalPrice}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "150px", textTransform: "none" }}
                className="fw-bold"
                onClick={handleToProceedCart}
              >
                Next <ArrowForwardIcon className="fs-5" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Modal
        open={isNotLoggedIn}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isNotLoggedIn}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "400px",
              height: "200px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" className="fw-bold">
              You need to log in first!
            </Typography>
            <Typography variant="body1" className="mt-3 mb-3">
              Doesn't have an account?{" "}
              <Link to="/customer-register">Sign up</Link>
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleCloseModal}
                sx={{ marginRight: "10px" }}
              >
                Close
              </Button>
              <Link to="/login">
                <Button variant="outlined" size="small" color="secondary">
                  Go to Login
                </Button>
              </Link>
            </Box>
          </div>
        </Fade>
      </Modal>
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          You need to log in first!
        </Alert>
      </Snackbar> */}
    </div>
  );
};
