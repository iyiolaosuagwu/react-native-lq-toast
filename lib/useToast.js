import React, { createContext, useContext, useState } from "react";
import LQToast from "./LQToast";
const ToastContext = createContext(undefined);
export const ToastProvider = ({ children, direction = "top", customComponent, duration = 4000, offsetTop = 30, offsetBottom = 30, }) => {
    const [toast, setToast] = useState({
        title: "",
        description: "",
        isVisible: false,
    });
    const showToast = ({ title, description, variant = "default", duration: customDuration, }) => {
        const toastDuration = customDuration !== null && customDuration !== void 0 ? customDuration : duration;
        setToast({ title, description, variant, isVisible: true });
        if (toastDuration > 0) {
            setTimeout(() => {
                setToast((prev) => (Object.assign(Object.assign({}, prev), { isVisible: false })));
            }, toastDuration);
        }
    };
    const hideToast = () => {
        setToast((prev) => (Object.assign(Object.assign({}, prev), { isVisible: false })));
    };
    return (<ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <LQToast {...toast} onDismiss={hideToast} direction={direction} customComponent={customComponent} offsetTop={offsetTop} offsetBottom={offsetBottom}/>
        </ToastContext.Provider>);
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
