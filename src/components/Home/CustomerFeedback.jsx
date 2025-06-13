import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Rating } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../styles/Home.scss";
import customer_img from "../../assets/feedbackimg.png";

const feedbackData = [
  {
    id: 1,
    name: "Floyd Miles",
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar1.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ronald Richards",
    review:
      "Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar2.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Savannah Nguyen",
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar3.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Ronald Richards",
    review:
      "Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar2.png",
    rating: 4,
  },
  {
    id: 5,
    name: "Savannah Nguyen",
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar3.png",
    rating: 5,
  },
];

export const CustomerFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
  const visibleFeedbacks = feedbackData.slice(
    startIndex,
    startIndex + feedbackPerPage
  );

  return (
    <div className="feedback-section py-5">
      <div>
        <Typography variant="h4" className="text-center mb-2 text-white">
          Our Customer Feedback
        </Typography>
        <Typography variant="subtitle1" className="text-center mb-4 text-white">
          Don’t take our word for it. Trust our customers
        </Typography>

        {/* Feedback Cards */}
        <Container>
          <Grid container spacing={2}>
            {visibleFeedbacks.map((feedback) => (
              <Grid item xs={12} md={6} key={feedback.id}>
                <div className="testimonial-block">
                  <div className="inner-box">
                    <div className="thumb-box">
                      <figure className="thumb"><img src={customer_img} alt="" /></figure>
                      <div className="rating">
                        <Rating
                          value={feedback.rating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="content-box">
                      <h4 className="name">    {feedback.name}</h4>
                      <div className="text"> {feedback.review}</div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box className="d-flex justify-content-center align-items-center mt-4">
          <Button onClick={handlePrevious} variant="contained" size="small">
            <ArrowBackIosIcon className="fs-6" />
          </Button>
          <Box className="mx-2 d-flex">
            {Array(totalPages)
              .fill()
              .map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    mx: 0.5,
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentIndex ? "#FC5F03" : "#C4C4C4",
                  }}
                />
              ))}
          </Box>
          <Button onClick={handleNext} variant="contained" size="small">
            <ArrowForwardIosIcon className="fs-6" />
          </Button>
        </Box>
      </div>
    </div>
  );
};
