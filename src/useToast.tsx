import React, { createContext, useContext, useState, ReactNode } from "react";
import LQToast from "./LQToast";

interface ToastState {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning" | "default";
    isVisible: boolean;
}

interface ShowToastOptions {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning" | "default";
    duration?: number;
}

interface ToastContextType {
    showToast: (options: ShowToastOptions) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
    direction?: "top" | "bottom";
    offsetTop?: number;
    offsetBottom?: number;
    customComponent?: React.FC<{ animationStyle?: any; onDismiss: () => void }>; // ✅ Ensuring correct type
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    direction = "top",
    customComponent,
    duration = 4000,
    offsetTop = 30,
    offsetBottom = 30,
}) => {
    const [toast, setToast] = useState<ToastState>({
        title: "",
        description: "",
        isVisible: false,
    });

    const showToast = ({
        title,
        description,
        variant = "default",
        duration: customDuration,
    }: ShowToastOptions) => {
        const toastDuration = customDuration ?? duration; // Use dynamic duration or default

        setToast({ title, description, variant, isVisible: true });

        if (toastDuration > 0) {
            setTimeout(() => {
                setToast((prev) => ({ ...prev, isVisible: false }));
            }, toastDuration);
        }
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, isVisible: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <LQToast
                {...toast}
                onDismiss={hideToast}
                direction={direction}
                customComponent={customComponent}
                offsetTop={offsetTop}
                offsetBottom={offsetBottom}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
