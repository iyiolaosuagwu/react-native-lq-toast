import React, { ReactNode } from "react";
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
interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
    position?: "top" | "bottom" | "center";
    animationType?: "slide" | "fade";
    offsetTop?: number;
    offsetBottom?: number;
    customToastComponent?: React.FC<{
        animationStyle?: any;
        onDismiss: () => void;
    }>;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export declare const useToast: () => ToastContextType;
export {};
