import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Stack,
    Button,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const Shipping = ({ open, onClose, onSuccess, editShippingData }) => {
    const [formData, setFormData] = useState({
        locality: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const alanAuthToken = Cookies.get("alanAuthToken");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.locality) tempErrors.locality = "Locality is required";
        if (!formData.city) tempErrors.city = "City is required";
        if (!formData.state) tempErrors.state = "State is required";
        if (!formData.zip) tempErrors.zip = "Zip is required";
        else if (!/^\d{5}$/.test(formData.zip)) tempErrors.zip = "Zip must be 5 digits";
        if (!formData.country) tempErrors.country = "Country is required";
        if (!formData.phone) tempErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Phone must be 10 digits";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        const isEditMode = !!editShippingData?._id;
        const url = isEditMode
            ? `https://www.discountdoorandwindow.com/api/address/ship-address`
            : `https://www.discountdoorandwindow.com/api/address/ship-address`;
        const method = isEditMode ? 'post' : 'post';

        try {
            const response = await axios[method](url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${alanAuthToken}`,
                },
            });

            alert(`Shipping address ${isEditMode ? "updated" : "saved"} successfully`);
            onSuccess?.();
            onClose();
        } catch (error) {
            alert("Failed to save shipping address");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editShippingData) {
            setFormData({
                locality: editShippingData.locality || "",
                city: editShippingData.city || "",
                state: editShippingData.state || "",
                zip: editShippingData.zip || "",
                country: editShippingData.country || "",
                phone: editShippingData.phone || "",
            });
        } else {
            setFormData({
                locality: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                phone: "",
            });
        }
    }, [editShippingData, open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{editShippingData ? "Edit Shipping Address" : "Add Shipping Address"}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <TextField label="Name" name="country" value={formData.country} error={!!errors.country} helperText={errors.country} onChange={handleChange} fullWidth />
                        <TextField label="Locality" name="locality" value={formData.locality} error={!!errors.locality} helperText={errors.locality} onChange={handleChange} fullWidth />
                        <TextField label="City" name="city" value={formData.city} error={!!errors.city} helperText={errors.city} onChange={handleChange} fullWidth />
                        <TextField label="State" name="state" value={formData.state} error={!!errors.state} helperText={errors.state} onChange={handleChange} fullWidth />
                        <TextField
                            label="Zip"
                            name="zip"
                            type="number"
                            value={formData.zip}
                            error={!!errors.zip}
                            helperText={errors.zip}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 5) {
                                    setFormData({ ...formData, zip: value });
                                    setErrors({ ...errors, zip: '' });
                                }
                            }}
                            fullWidth
                            inputProps={{ maxLength: 6 }}
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            type="number"
                            value={formData.phone}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 10) {
                                    setFormData({ ...formData, phone: value });
                                    setErrors({ ...errors, phone: '' });
                                }
                            }}
                            fullWidth
                            inputProps={{ maxLength: 10 }}
                        />
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button onClick={onClose} color="secondary" variant="outlined">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: '#1976d2' }}
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} color="inherit" />}
                            >
                                {loading ? "Saving..." : editShippingData ? "Update" : "Save"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Shipping;
