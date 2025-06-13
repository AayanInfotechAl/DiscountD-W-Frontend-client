import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import banner from "../../assets/doors.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import No_Image_Available from "../../assets/No_Image_Available.jpg";
import Loader from "../../loader/Loader";

const SubCategories = () => {
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { subCategory_id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .slice(0, -1)
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  const fetchExploreSubCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/subSubCategories/subcategoryid/${subCategory_id}`
      );
      if (response?.data?.status === 200) {
        setSubsubCategories(response?.data?.data);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subCategory_id) {
      fetchExploreSubCategories();
    }
  }, [subCategory_id]);

  const handleClick = (subcategoryDetails) => {
    navigate(`/allsubproducts/${subcategoryDetails._id}`);
  };

  return (
    <div className="doors-container px-3 mb-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <Box>
              {subsubCategories?.map((category, index) => (
                <Typography
                  key={index}
                  variant="h5"
                  className="text-black fw-bold"
                >
                  {category.subcategoryName}
                </Typography>
              ))}
              <Typography variant="h6" className="text-black fw-bold">
                <span>
                  Home {">"} {formatPath(location.pathname)}
                </span>
              </Typography>
            </Box>
          </Box>
          <Container sx={{ mt: 4 }}>
            {errorMessage ? (
              <Typography
                variant="h6"
                color="error"
                textAlign="center"
                sx={{ mt: 2 }}
              >
                {errorMessage}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {subsubCategories?.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        textAlign: "center",
                        position: "relative",
                        backgroundColor: "#f1f1f1",
                        width: "100%",
                      }}
                      className="rounded-3 p-2"
                      onClick={() => handleClick(category)}
                    >
                      <Box
                        component="img"
                        className="p-3"
                        src={category?.images || No_Image_Available}
                        alt={category?.name}
                        sx={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                      />
                      <p className="fw-bold">
                        {category?.name || "N/A"}
                      </p>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default SubCategories;
