import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import banner from "../../src/assets/contact.png";
import card_img1 from "../../src/assets/image 1.png";
import { useLocation } from "react-router-dom";
import pdfFile from "../../src/assets/Statement.pdf";
import axios from "axios";
import Loader from "../loader/Loader";

export const About = () => {
  const [aboutusContent, setAboutusContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  const fetchAboutUs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.discountdoorandwindow.com/api/StaticContent/content/About"
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setAboutusContent(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <div className="doors-container mb-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: { xs: "200px", md: "300px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              px: 2,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", md: "1.2rem" },
                }}
              >
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>
          <Container className="mt-4">
            <Box className="text-center d-flex flex-column align-items-center">
              {/* <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {aboutusContent?.section}
              </Typography> */}
              <Grid container spacing={2} className="mt-4">
                <Grid item xs={12} sm={4}>
                  <img
                    src={card_img1}
                    alt="About Us"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  sx={{
                    textAlign: "justify",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  <Box>
                    {aboutusContent && aboutusContent.content ? (
                      <>
                        <Box mb={4}>
                          <Typography
                            variant="h3"
                            className="fw-bold"
                            gutterBottom
                          >
                            {aboutusContent?.section}
                          </Typography>
                          <Divider />
                        </Box>
                        <Box mb={3}>
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: aboutusContent?.content,
                            }}
                          />
                        </Box>
                      </>
                    ) : (
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                      >
                        Coming soon...!
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </div>
  );
};
