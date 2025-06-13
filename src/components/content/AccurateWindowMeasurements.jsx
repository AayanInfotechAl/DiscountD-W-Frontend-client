import React from "react";
import content from "../../json/doors.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import window_mesaure from "../../assets/window_mesaure.png";
import card_img1 from "../../assets/window_measure08.jpeg";
import card_img2 from "../../assets/window_measure04.jpeg";
import "./windowMeasurement.css";

const AccurateWindowMeasurements = () => {
  const { accurate_window_measurements } = content;

  return (
    <div className="mb-4">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom className="fw-bold">
          {accurate_window_measurements.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box mt={2}>
              <img
                src={window_mesaure}
                alt="Guide 1"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className="d-flex align-items-center">
            <Typography variant="body1" paragraph>
              {accurate_window_measurements.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              mt={4}
              className="d-flex justify-content-center align-items-center"
            >
              <Box
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Vhwytq_ghVo"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container className="my-5 bg-light container-windows-measurements">
        {/* Row 1 */}
        <div className="row g-4">
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure01.jpg"
              alt="Measure 1"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure02.jpg"
              alt="Measure 2"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row g-4 mt-4">
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure03.jpg"
              alt="Measure 3"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <p>
              To get the <strong>width</strong>, Open the window and measure the distance from inner most part of the vertical frame. Measure to the 1/8th inch mark.
              </p>
              <p>
                Subtract 3/8th of an inch from your measurement. This will give
                you room to install the window with the caulking.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row g-4 mt-4">
          <div className="col-md-6">
            <img
              src={card_img2}
              alt="Custom Measure"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure05.jpg"
              alt="Measure 5"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="row g-4 mt-4">
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure06.jpg"
              alt="Measure 6"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <p>
              To get the <strong>height</strong>, measure the distance from the inner most part of the horizontal frame. Measure to the 1/8th inch mark.
              </p>
              <p>Subtract 3/8th of an inch from your measurement.</p>
            </div>
          </div>
        </div>
        {/* Row 5 */}
        <div className="row g-4 mt-4">
          <div className="col-md-6">
            <img
              src="https://discountdw.com/files/images/window_measure/window_measure07.jpg"
              alt="Measure 7"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
          <div className="col-md-6">
            <img
              src={card_img1}
              alt="Custom Measure 2"
              className="img-fluid rounded shadow-sm measure-img"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccurateWindowMeasurements;
