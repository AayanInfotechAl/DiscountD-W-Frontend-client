// src/components/toastMessage/Toast.jsx
import { Toaster, toast } from "react-hot-toast";

const ToastNotification = ({ position = "top-right", duration = 3000 }) => {
    return (
        <Toaster position={position} toastOptions={{ duration, }} reverseOrder={false} />
    );
};

export const showSuccessToast = (message) => {
    toast.success(message, {
        style: { background: "white", color: "black" },
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        style: { background: "#D32F2F", color: "#fff" },
    });
};

export const showCustomMessage = (message) => {
    toast.error(message, {
        style: { background: "#D32F2F", color: "#fff" },
    });
};

export default ToastNotification;
