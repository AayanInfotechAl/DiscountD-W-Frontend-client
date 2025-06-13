import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

const HearthWidget = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) {
      document.documentElement.style.display = "flex";
      document.documentElement.style.justifyContent = "center";
      document.documentElement.style.alignItems = "center";
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);

  }, []);

  return (
    <Container className="mt-4 mb-4">
      <Typography variant="h4" gutterBottom className="fw-bold text-center">
        Financing Calculator
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4 ms-5">
              <iframe
                src="https://financing-calculator.onrender.com/"
                width="100%"
                height="800px"
                style={{ border: "none" }}
                title="Financing Calculator"
                className="financing-calculator"
              ></iframe>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default HearthWidget;