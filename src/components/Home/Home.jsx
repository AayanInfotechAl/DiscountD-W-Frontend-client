import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "../../styles/Home.scss";
import banner from "../../assets/home-banner.png";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CustomerFeedback } from "./CustomerFeedback";
import { LatestBlogs } from "./LatestBlogs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loader from "../../loader/Loader";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Backdrop from "@mui/material/Backdrop";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ConstructionIcon from '@mui/icons-material/Construction';
export const Home = () => {
  const [exploreCategories, setExploreCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchExploreCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.discountdoorandwindow.com/api/categories/getAllCategories"
      );
      if (response?.data?.status === 200) {
        setExploreCategories(response?.data?.data);
        localStorage.setItem("windowCategoryId", response?.data?.data[0]._id);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreCategories();
  }, []);

  const buttonData = [
    { icon: <TroubleshootIcon />, urlPath: "/order-track", label: "Track Your Order" },
    { icon: <ElectricBoltIcon />, urlPath: "/rightfor-me", label: "Energy Saving" },
    { icon: <SquareFootIcon />, urlPath: "/accurate-measurements", label: "Measure Your Old" },
    { icon: <ConstructionIcon />, urlPath: "/pre-approved-installer", label: "Find an Installer" },
    { icon: <ConstructionIcon />, urlPath: "/diyinstall-guides", label: "DIY Installation Guide" },
  ];

  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 2;

    function scrollMarquee() {
      scrollAmount -= scrollSpeed;
      if (marquee.scrollWidth + scrollAmount <= 0) {
        scrollAmount = 0;
      }
      marquee.style.transform = `translateX(${scrollAmount}px)`;
      requestAnimationFrame(scrollMarquee);
    }

    scrollMarquee();
  }, []);

  const handleClick = (item) => {
    if (!item?.isSubCategory) {
      navigate(`/allsubproducts/${item?._id}`, {
        state: { categorydetails: item },
      });
    } else {
      navigate(`/categories/${item?._id}`);
    }
  };
  const slides = [
    {
      image: "src/images/main-slider/banner-1.jpg",
      title: "Upgrade Your Home With The Right Windows, Doors, And More—Affordably.",
      description: "Some representative placeholder content for the first slide."
    },
    {
      image: "src/images/main-slider/banner-2.jpg",
      title: "Second slide label",
      description: "Some representative placeholder content for the second slide."
    },
    {
      image: "src/images/main-slider/banner-1.jpg",
      title: "Third slide label",
      description: "Some representative placeholder content for the third slide."
    }
  ];
  return (
    <>
      <div className="home-container">
        {/* <Grid container alignItems="center" className="home-content ">
          <Grid item xs={12} md={6} className="text-section">
            <Container>
            <Typography variant="h3" component="h1" className="main-heading">
              Upgrade Your Home With
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              className="highlighted-heading"
            >
              The Right <span>Windows, Doors,</span>{" "}
              <span style={{ fontWeight: "bold" }}>And More—Affordably.</span>
            </Typography>
            <Link to="/get-estimation">
              <Button
                variant="contained"
                color="primary"
                className="estimate-button"
              >
                Get Estimates
              </Button>
            </Link>
            </Container>
            
          </Grid>
          <Grid item xs={12} md={6} className="image-section">
            <img src={banner} alt="Home" className="home-image" />
          </Grid>
        </Grid> */}

        {<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={slide.image} className="d-block w-100" alt="Slide" />
                <div className="carousel-caption d-flex flex-column h-100 align-items-start justify-content-center bottom-0 text-start">
                  <h2 className="bg-dark bg-opacity-50 py-2 px-1 heading-slider-main">Upgrade Your Home With <br /> The Right Windows, Doors, <br />And More—Affordably.</h2>
                  {/* <p className="bg-dark bg-opacity-50 py-2 px-4">{slide.description}</p> */}
                  <Link to="/get-estimation">
                    <Button
                      variant="contained"
                      color="primary"
                      className="estimate-button"
                    >
                      Get Estimates
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>}

        <Box className="marquee-container">
          <div className="marquee-content marquee-home" ref={marqueeRef}>
            <div className="d-flex">
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
            </div>
            <div className="d-flex">
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography
                variant="h2"
                className="me-2 fw-bold"
                sx={{ color: "#0068B3" }}
              >
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
            </div>
          </div>
        </Box>
        <Container maxWidth="false">
          <Box
            sx={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: { xs: "1fr", md: "auto" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
            className="button-container"
          >

            {buttonData.map((button, index) => (
              <Link to={button?.urlPath} key={index} className="button-link w-100">
                <div className="custom-button p-3 text-white">
                  <div>{button?.icon}</div>
                  <div>{button.label} <ArrowForwardIcon className="fs-5" /></div>
                </div>
                {/* <Button
                  variant="contained"
                  className="custom-button"
                  sx={{ textTransform: "none" }}
                >
                  {button?.icon}<br/>
                  {button.label} <ArrowForwardIcon className="fs-5" />
                </Button> */}
              </Link>
            ))}
          </Box>

          {/* ----------------Spotlight Deals--------------------- */}

          <Box className="spotlight_deals mt-4 mb-4">
            <Typography variant="h4" className="heading_1">
              Explore
            </Typography>
          </Box>
          {loading && (
            <Backdrop open={true} style={{ zIndex: 1000, color: "#fff" }}>
              <Loader color="inherit" />
            </Backdrop>
          )}
          {!loading && (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {exploreCategories.length > 0 ? (
                exploreCategories.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <div className="service-block">
                      <div className="inner-box">
                        <div className="image-box">
                          <figure className="image"><img
                            src={item?.images[0] || No_Image_Available}
                            alt="" /></figure>
                        </div>
                        <div className="lower-content text-center">
                          <h3><a href="#">  {item?.name
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                            )
                            .join(" ")}</a></h3>
                          <a href="#" onClick={() => handleClick(item)} className="buy-now">Buy Now <i className="fas fa-arrow-right"></i> </a>
                        </div>
                      </div>
                    </div>
                    {/* <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        mx: "auto",
                        backgroundColor: "#000",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(0.95)",
                        },
                      }}
                      onClick={() => handleClick(item)}
                    >
                      <CardMedia
                        component="img"
                        image={item?.images[0] || No_Image_Available}
                        alt="green iguana"
                        sx={{

                          height: 250,
                        }}
                        className=""
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            color: "#0068B3",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            className="fw-bold"
                            variant="h5"
                            component="div"
                          >
                            {item?.name
                              ?.split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </Typography>
                        </Box>
                        <Box className="mt-2">
                          <Button
                            size="large"
                            variant="contained"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                            className="w-100 fw-bold buy-now"
                          >
                            Buy Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card> */}
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
        <CustomerFeedback />
        <Container maxWidth="false">
          <LatestBlogs />
        </Container>
      </div>
    </>
  );
};
