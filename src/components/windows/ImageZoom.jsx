import React, { useState } from "react";
import { Box } from "@mui/material";

const ImageZoom = ({ src, fallback }) => {
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <Box
            sx={{ width: "100%", maxHeight: "400px", overflow: "hidden", position: "relative", borderRadius: "8px", border: "1px solid #ccc", }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
        >
            <img
                src={src}
                alt="Main Door"
                onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
                style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px", transition: "transform 0.2s ease", transformOrigin: `${position.x}% ${position.y}%`, transform: zoom ? "scale(2)" : "scale(1)", }}
            />
        </Box>
    );
};
export default ImageZoom;