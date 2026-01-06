import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import No_Image_Available from "../../assets/No_Image_Available.jpg";

const ImageCard = ({ category, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        textAlign: "center",
        position: "relative",
        backgroundColor: "#f1f1f1",
        width: "100%",
        cursor: "pointer",
      }}
      className="rounded-3 p-2"
      onClick={() => onClick(category)}
    >
      {!imgLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          animation="wave"
          sx={{ bgcolor: "#e0e0e0" }}
        />
      )}

      <Box
        component="img"
        className="p-3"
        src={category?.images || No_Image_Available}
        alt={category?.name}
        sx={{
          width: "100%",
          height: "300px",
          objectFit: "contain",
          display: imgLoaded ? "block" : "none",
        }}
        onLoad={() => setImgLoaded(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = No_Image_Available;
          setImgLoaded(true);
        }}
      />
      <p className="fw-bold">{category?.name || "N/A"}</p>
    </Box>
  );
};

export default ImageCard;
