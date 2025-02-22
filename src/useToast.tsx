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
    customComponent?: React.FC<{ animationStyle: any; onDismiss: () => void }>;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    direction = "top",
    customComponent,
    duration = 300,
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
    }: ShowToastOptions) => {
        setToast({ title, description, variant, isVisible: true });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 4000);
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
                duration={duration}
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
