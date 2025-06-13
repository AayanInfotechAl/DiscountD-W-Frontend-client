import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Container,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";

export const UserDetails = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  const loggedInUserId = Cookies.get("userLoggedInId");
  const token = Cookies.get("alanAuthToken");

  const fetchCurrentUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/CustMng/customers/${loggedInUserId}`
      );
      if (response.status === 200 && response.data.success) {
        setCurrentUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://www.discountdoorandwindow.com/api/CustMng/changePassword",
        {
          email: currentUser.email,
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.success) {
        setSuccessMessage("Password changed successfully.");
        setPasswordError("");
        setIsOpenModel(false);
      } else {
        setPasswordError(response.data.message || "Error changing password.");
      }
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Error changing password."
      );
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUserId) {
      fetchCurrentUserDetails();
    }
  }, [loggedInUserId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="mt-4 mb-4">
      {passwordError && (
        <Typography variant="body2" color="error">
          {passwordError}
        </Typography>
      )}

      <Card sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
        <Box className="d-flex justify-content-between align-items-center">
          <Box>
            <Typography variant="h5" component="div" fontWeight="bold">
              {currentUser.name || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.email || "N/A"}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsOpenModel(true)}
          >
            Change Password
          </Button>
        </Box>
        <Divider className="my-2" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Mobile Number
              </Typography>
              <Typography variant="body1">
                {currentUser.mobile || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1">
                {currentUser.address || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                State
              </Typography>
              <Typography variant="body1">
                {currentUser.state || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Zip Code
              </Typography>
              <Typography variant="body1">
                {currentUser.zipCode || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isOpenModel && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Change Password</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsOpenModel(false)} 
                ></button>
              </div>
              <div className="modal-body">
                <TextField
                  name="currentPassword"
                  placeholder="Current Password"
                  variant="outlined"
                  type={showCurrentPassword ? "text" : "password"}
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    marginBottom: 2,
                    "& fieldset": { border: "none" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowCurrentPassword((prev) => !prev)
                          }
                        >
                          {showCurrentPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="newPassword"
                  placeholder="New Password"
                  variant="outlined"
                  type={showNewPassword ? "text" : "password"}
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    marginBottom: 2,
                    "& fieldset": { border: "none" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#D0E5F4",
                    borderRadius: "5px",
                    marginBottom: 2,
                    "& fieldset": { border: "none" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {passwordError && (
                  <Typography variant="body2" color="error">
                    {passwordError}
                  </Typography>
                )}
                {successMessage && (
                  <Typography variant="body2" color="success">
                    {successMessage}
                  </Typography>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsOpenModel(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserDetails;
