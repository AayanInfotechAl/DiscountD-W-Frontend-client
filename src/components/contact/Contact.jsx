import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  InputLabel,
  FormControl,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import banner from "../../assets/contact.png";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CallIcon from "@mui/icons-material/Call";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../redux/slices/addressSlice";

export const Contact = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, mobileNo } = formData;

    if (!name || !email || !mobileNo) {
      showErrorToast("Please fill in all required fields (Name, Email, Mobile No.)");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { ...formData, type: "Contact Us" };

      const res = await axios.post(
        "https://www.discountdoorandwindow.com/api/contacts",
        payload
      );

      showSuccessToast("Message submitted successfully!");
      setFormData({ name: "", email: "", mobileNo: "", message: "" });
    } catch (error) {
      showErrorToast("Failed to submit message. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" > ");
  };

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const { data } = useSelector((state) => state.address);
  const address = data?.data?.[0];

  const contactInfo = [
    {
      icon: <AddLocationIcon className="me-4" />,
      title: "Address",
      details: address
        ? `${address.street} ${address.suite}, ${address.city}, ${address.state} ${address.zip}`
        : "Loading address...",
    },
    {
      icon: <CallIcon className="me-4" />,
      title: "Phone",
      details: address?.phone ? `Mobile: ${address.phone}` : "Loading phone...",
    },
  ];

  const formFields = [
    { label: "Your Name", placeholder: "Enter your name", name: "name" },
    { label: "Email Address", placeholder: "Enter your email", name: "email" },
    { label: "Mobile No.", placeholder: "Enter your mobile number", name: "mobileNo" },
    {
      label: "Message",
      placeholder: "Type your message...",
      name: "message",
      isTextarea: true,
    },
  ];


  return (
    <div className="doors-container mb-4">
      <Box sx={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", }}>
        <Box>
          <Typography variant="h2" sx={{ color: "black", fontWeight: "bold", fontSize: { xs: "2rem", md: "3rem" } }}>
            Contact
          </Typography>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: { xs: "1rem", md: "1.2rem" } }}>
            Home {">"} {formatPath(location.pathname)}
          </Typography>
        </Box>
      </Box>

      <Container className="mt-4">
        <Box className="text-center d-flex flex-column align-items-center">
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Get In Touch With Us
          </Typography>
          <Typography sx={{ width: { xs: "100%", md: "50%" }, color: "gray", textAlign: "center", fontSize: { xs: "0.9rem", md: "1rem" }, }}>
            For more information about our product & services, please feel free
            to drop us an email. Our staff is always here to help you. Do not
            hesitate!
          </Typography>
          <Grid container spacing={2} className="mt-4">
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Box>
                {contactInfo.map((info, index) => (
                  <Box key={index} sx={{ maxWidth: 250, display: "flex", mb: 4 }}>
                    {info.icon}
                    <Box className="text-start">
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                        {info.title}
                      </Typography>
                      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
                        {info.details}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {formFields.map((field, index) => (
                <Box className="mb-3" key={index}>
                  <InputLabel sx={{ fontWeight: "bold", color: "black", mb: 1, textAlign: "left" }}>
                    {field.label} {!field.isTextarea && <span style={{ color: "red" }}>*</span>}
                  </InputLabel>
                  <FormControl fullWidth>
                    {field.isTextarea ? (
                      <TextareaAutosize minRows={3} name={field.name} className="p-2" placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange}
                        style={{ borderRadius: "5px", border: "1px solid lightgray", fontFamily: "inherit", }}
                      />
                    ) : (
                      <TextField name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={(e) => {
                        if (field.name === "mobileNo") {
                          const onlyNums = e.target.value.replace(/\D/g, "");
                          setFormData((prev) => ({ ...prev, mobileNo: onlyNums }));
                        } else {
                          handleChange(e);
                        }
                      }}
                        inputProps={
                          field.name === "mobileNo"
                            ? { inputMode: "numeric", pattern: "[0-9]*", maxLength: 15 }
                            : {}
                        }
                      />
                    )}
                  </FormControl>
                </Box>
              ))}
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}
              sx={{ width: { xs: "100%", sm: "150px" }, backgroundColor: "#1976D2", textTransform: "capitalize", fontWeight: "bold", fontSize: "1rem", }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};
