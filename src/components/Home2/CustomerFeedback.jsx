import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Rating } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../styles/Home.scss";
import axios from "axios";


export const CustomerFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://www.discountdoorandwindow.com/api/ratings/approved");
        if (response?.data?.status === 200) {
          setFeedbackData(response.data.data);
        } else {
          console.error("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };
    fetchReviews();
  }, []);

  const feedbackPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(feedbackData.length / feedbackPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === totalPages ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const startIndex = currentIndex * feedbackPerPage;
  const visibleFeedbacks = feedbackData?.slice(
    startIndex,
    startIndex + feedbackPerPage
  );

  return (
    <div className="feedback-section py-5">
      <div>
        <div className="sec-title text-center">
          <h2 className="text-white">Our Customer Feedback</h2>
          <h5 className="text-white">Don’t take our word for it. Trust our customers</h5>
        </div>
        <Container>
          <Grid container spacing={2}>
            {visibleFeedbacks && visibleFeedbacks.length > 0 ? (
              visibleFeedbacks?.map((feedback, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <div className="testimonial-block">
                    <div className="inner-box">
                      <div className="content-box">
                        <h4 className="name" style={{ textTransform: "none" }}>{feedback?.userName || "N/A"}</h4>
                        <p className="text-muted fw-bold mb-0">{new Date(feedback?.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", })}</p>
                        <div className="text">{feedback?.review.length > 200 ? `${feedback?.review.slice(0, 200)}...` : feedback?.review}</div>
                        <Rating value={feedback?.rating} precision={0.5} readOnly />
                      </div>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p className="text-center text-muted">No reviews available at the moment.</p>
              </Grid>
            )}
          </Grid>
        </Container>
        <Box className="d-flex justify-content-center align-items-center mt-4">
          <Button onClick={handlePrevious} variant="contained" sx={{ backgroundColor: "#ff6600" }} size="small">
            <ArrowBackIosIcon className="fs-6" />
          </Button>
          <Box className="mx-2 d-flex">
            {Array(totalPages)
              .fill()
              .map((_, index) => (
                <Box key={index} sx={{ mx: 0.5, width: "10px", height: "10px", borderRadius: "50%", backgroundColor: index === currentIndex ? "#FC5F03" : "#C4C4C4", }} />
              ))}
          </Box>
          <Button onClick={handleNext} variant="contained" sx={{ backgroundColor: "#ff6600" }} size="small">
            <ArrowForwardIosIcon className="fs-6" />
          </Button>
        </Box>
      </div>
    </div>
  );
};
