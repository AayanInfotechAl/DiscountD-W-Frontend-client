import React, { useEffect, useState } from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import pdfFile from "../../src/assets/Statement_page-0001.jpg";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import "../../src/styles/fedsupplier.scss";

const FedSupplier = () => {
  const [loading, setLoading] = useState(false);
  const formatPath = (path) => {
    const specialMappings = {
      "book a free consultant": "Book A Free Consultant",
    };
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        const formattedSegment =
          specialMappings[segment] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
        return formattedSegment;
      })
      .join(" > ");
  };
  const handlePrint = () => {
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.width = "0px";
    printFrame.style.height = "0px";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    printFrame.contentWindow.document.open();
    printFrame.contentWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          <img src="${pdfFile}" style="width:100%; height:auto;" onload="window.print(); window.onafterprint = function() { window.close(); }"/>
        </body>
      </html>
    `);
    printFrame.contentWindow.document.close();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "Statement.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fedsupplier-container mb-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="k2t-title-bar">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="main-title text-white fw-bold">
                    <span>Capability Statement</span>
                  </h1>
                  <div className="links">
                    <Typography
                      variant="h6"
                      className="text-white fw-bold"
                      sx={{ fontSize: { xs: "14px", md: "18px" } }}
                    >
                      <span>
                        Home {">"} {formatPath(location.pathname)}
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container sx={{ mt: 5, mb: 5, textAlign: "center" }}>
            <Box sx={{ mt: 2, mb: 4 }}>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "primary.main",
                  padding: { xs: "5px 15px", sm: "6px 20px", md: "8px 25px" }, // Responsive padding
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
                  minWidth: { xs: "120px", sm: "140px", md: "150px" },
                  "&:hover": {
                    backgroundColor: "#ff6600",
                  },
                }}
                onClick={handlePrint}
              >
                Print
              </Button>

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "primary.main",
                  padding: { xs: "5px 15px", sm: "6px 20px", md: "8px 25px" },
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  minWidth: { xs: "120px", sm: "140px", md: "150px" },
                  minWidth: "150px",
                  "&:hover": {
                    backgroundColor: "#ff6600",
                  },
                }}
                onClick={handleDownload}
              >
                Download
              </Button>
            </Box>

            <img src={pdfFile} alt="PDF Preview" className="pdf-image-fluid" />
          </Container><Container
            className="text-center border border-1 rounded-pill my-5 contact-container"
            sx={{ backgroundColor: "#fff7f2" }}
          >
            <Box className="p-4">
              <Typography
                variant="h3"
                gutterBottom
                className="fw-bold"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
                  textAlign: "center", // Optional: Center text
                }}
              >
                Let's Get in Touch
              </Typography>

              <Link to="/contact">
                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    backgroundColor: "primary.main",
                    padding: "10px 25px",
                    fontSize: "1.1rem",
                    minWidth: "300px",
                    "&:hover": {
                      backgroundColor: "#ff6600",
                    },
                  }}
                >
                  Contact US
                </Button>
              </Link>
            </Box>
          </Container>
        </>
      )}
    </div>
  );
};

export default FedSupplier;
