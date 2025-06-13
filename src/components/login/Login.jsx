import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slices/userLoginSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user_login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData)).then((action) => {
      if (userLogin.fulfilled.match(action)) {
        setSnackbarMessage(action.payload.message || "Login successful");
        Cookies.set("userLoggedInId", action.payload.customerId);
        Cookies.set("alanAuthToken", action.payload.token);
        const redirectUrl = localStorage.getItem("redirectUrl");
        if (redirectUrl) {
          window.location.href = redirectUrl; 
          localStorage.removeItem("redirectUrl");
        } else {
          window.location.href = "/"; 
        }
      } else if (userLogin.rejected.match(action)) {
        setSnackbarMessage(action.payload || "Login failed");
        setOpenSnackbar(true);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <Container
        sx={{
          mt: { xs: 3, md: 5 },
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "80%", md: "400px" } }}>
          <Typography
            variant="h4"
            align="center"
            className="fw-bold text-black"
            sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }}
          >
            Login
          </Typography>
          <Box className="mt-4">
            <InputLabel
              className="text-black fw-bold"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Email
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mt: 1,
                width: "100%",
                backgroundColor: "#D0E5F4",
                borderRadius: "10px",
                "& fieldset": {
                  border: "none",
                },
              }}
            />
          </Box>
          <Box className="mt-4">
            <InputLabel
              className="text-black fw-bold"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Password
            </InputLabel>
            <TextField
              id="outlined-basic"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                mt: 1,
                width: "100%",
                backgroundColor: "#D0E5F4",
                borderRadius: "10px",
                "& fieldset": {
                  border: "none",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={togglePasswordVisibility}
                    sx={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "black" }} />
                    ) : (
                      <Visibility sx={{ color: "black" }} />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box className="text-center mt-3">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="w-100"
              sx={{
                backgroundColor: "#1C4E9B",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <span>Logging...</span> : "Login"}
            </Button>
            <Typography variant="body1" className="mt-2">
              Doesn't have an account?&nbsp;
              <Link to="/customer-register">Sign up</Link>
            </Typography>
            <Typography variant="body1" className="mt-2">
              <Link to="/forget-password">Forget Password</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage === "Login successful" ? "success" : "error"
          }
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
