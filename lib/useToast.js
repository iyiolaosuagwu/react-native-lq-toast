import React, { createContext, useContext, useState } from "react";
import LQToast from "./LQToast";
const ToastContext = createContext(undefined);
export const ToastProvider = ({ children, direction = "top", customComponent, duration = 300, offsetTop = 60, offsetBottom = 100, }) => {
    const [toast, setToast] = useState({
        title: "",
        description: "",
        isVisible: false,
    });
    const showToast = ({ title, description, variant = "default", }) => {
        setToast({ title, description, variant, isVisible: true });
        setTimeout(() => {
            setToast((prev) => (Object.assign(Object.assign({}, prev), { isVisible: false })));
        }, 4000);
    };
    const hideToast = () => {
        setToast((prev) => (Object.assign(Object.assign({}, prev), { isVisible: false })));
    };
    return (<ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <LQToast {...toast} onDismiss={hideToast} direction={direction} customComponent={customComponent} duration={duration} offsetTop={offsetTop} offsetBottom={offsetBottom}/>
        </ToastContext.Provider>);
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
