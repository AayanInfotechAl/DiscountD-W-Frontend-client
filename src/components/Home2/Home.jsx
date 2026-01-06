import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import "../../styles/Home.scss";
import banner1 from "../../assets/main-slider/banner-1.jpg";
import banner2 from "../../assets/main-slider/banner-2.jpg";
import banner3 from "../../assets/main-slider/banner-3.jpg";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CustomerFeedback } from "./CustomerFeedback";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../loader/Loader";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Backdrop from "@mui/material/Backdrop";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ConstructionIcon from "@mui/icons-material/Construction";
import "../../css/style.css";
import "../../css/responsive.css";
import "../../css/color-themes/blue-theme.css";

export const Home = () => {
  const [exploreCategories, setExploreCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAndroid, setIsAndroid] = useState(false);
  const [loading, setLoading] = useState(true);

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
    {
      icon: <TroubleshootIcon />,
      urlPath: "/order-track",
      label: "Track Your Order",
    },
    {
      icon: <ElectricBoltIcon />,
      urlPath: "/rightfor-me",
      label: "Energy Saving",
    },
    {
      icon: <SquareFootIcon />,
      urlPath: "/accurate-measurements",
      label: "Measure Your Old",
    },
    {
      icon: <ConstructionIcon />,
      urlPath: "/pre-approved-installer",
      label: "Find an Installer",
    },
    {
      icon: <ConstructionIcon />,
      urlPath: "/diyinstall-guides",
      label: "DIY Installation Guide",
    },
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
    // const encodedName = encodeURIComponent(item?.name?.trim());
    if (!item?.isSubCategory) {
      navigate(`/allsubproducts/${item?._id}`, {
        state: { categorydetails: item, categoryName: item?.name },
      });
    } else {
      navigate(`/categories/${item?._id}`, { state: { categoryName: item?.name } });
    }
  };

  const slides = [
    {
      image: banner3,
      title:
        "Upgrade Your Home With The Right Windows, Doors, And More—Affordably.",
      description:
        "Some representative placeholder content for the first slide.",
    },
    {
      image: banner2,
      title: "Upgrade Your Home With The Right Windows, Doors, And More—Affordably.",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      image: banner1,
      title: "Upgrade Your Home With The Right Windows, Doors, And More—Affordably.",
      description:
        "Some representative placeholder content for the third slide.",
    },
  ];

  const checkDevice = () => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
  };
  useEffect(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <>
      <div className="home-container">
        {
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {slides?.map((_, index) => (
                <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : undefined} aria-label={`Slide ${index + 1}`}></button>
              ))}
            </div>
            <div className="carousel-inner">
              {slides?.map((slide, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={slide.image} className="d-block w-100" alt="Slide" style={{ filter: "brightness(45%)" }} />
                  <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0 text-center">
                    <h2 className="px-1 heading-slider-main">
                      <span>Upgrade</span>&nbsp;
                      <span>Your</span>&nbsp;
                      <span>Home</span>
                      <span>With</span>&nbsp;
                      <span>The</span>&nbsp;
                      <span>Right</span>&nbsp;
                      <span>Windows,</span>&nbsp;
                      <span>Doors,</span>
                      <span>And</span>&nbsp;
                      <span>More - Affordably</span>&nbsp;
                    </h2>
                    <div className="mt-4 d-flex justify-content-center">
                      <Link to="/get-estimation">
                        <Button variant="contained" color="primary" className="estimate-button" endIcon={<ArrowForwardIcon />}>
                          Get Estimates
                        </Button>
                      </Link>
                    </div>
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
          </div>
        }

        <Box className="marquee-container">
          <div className="marquee-content marquee-home" ref={marqueeRef}>
            <div className="d-flex">
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
            </div>
            <div className="d-flex">
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
              <Typography variant="h2" className="me-2 fw-bold fs-4" sx={{ color: "#0068B3" }}>
                || SELECT PRODUCTS BELOW AND GET PRICING NOW ||
              </Typography>
            </div>
          </div>
        </Box>
        <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center", }} className="button-container">
            {buttonData?.map((button, index) => (
              <Link to={button?.urlPath} key={index} className="button-link">
                <div className="custom-button p-3 text-white">
                  <div>{button?.icon}</div>
                  <div>
                    {button.label} <ArrowForwardIcon className="fs-5" />
                  </div>
                </div>
              </Link>
            ))}
          </Box>
        </Container>

        {/* ----------------Spotlight Deals--------------------- */}
        <section className="explore-section">
          <div className="container">
            <Box className="spotlight_deals mt-4 mb-4">
              <div className="sec-title text-center">
                <h2>Explore</h2>
              </div>
            </Box>
            {loading && (
              <Backdrop open={true} style={{ zIndex: 1000, color: "#fff" }}>
                <Loader color="inherit" />
              </Backdrop>
            )}
            {!loading && (
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                {exploreCategories.length > 0 ? (
                  exploreCategories.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <div className="service-block">
                        <div className="inner-box">
                          <div className="image-box">
                            <figure className="image">
                              <img src={item?.images[0] || No_Image_Available} onError={(e) => { e.target.onerror = null; e.target.src = "https://i.gifer.com/origin/0e/0ef02e4dedc32b87c71799c133cef346_w200.gif"; }} loading="lazy" alt="" />
                            </figure>
                          </div>
                          <div className="lower-content text-center">
                            <h3>
                              {item?.name?.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}
                            </h3>
                            <p onClick={() => handleClick(item)} className="buy-now">
                              Buy Now <i className="fas fa-arrow-right"></i>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <div className="text-center">
                      <p className="text-black mb-0">{errorMessage}</p>
                      <img
                        height="200px" width="200px"
                        src="https://static.vecteezy.com/system/resources/previews/016/026/442/non_2x/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                        alt="Empty Cart"
                      />
                      <p className="text-muted">
                        Looks like you haven’t added anything to your cart yet. Start shopping and come back here to review your items.
                      </p>
                    </div>
                  </Grid>
                )}
              </Grid>
            )}
          </div>
        </section>
        <CustomerFeedback />
        {/* <Container maxWidth="false">
          <LatestBlogs />
        </Container> */}
      </div>
    </>
  );
};