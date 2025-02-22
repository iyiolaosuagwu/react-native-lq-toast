import React, { ReactNode } from "react";
interface ShowToastOptions {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning";
}
interface ToastContextType {
    showToast: (options: ShowToastOptions) => void;
    hideToast: () => void;
}
interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
    direction?: "top" | "bottom";
    customComponent?: React.FC<{
        animationStyle: any;
        onDismiss: () => void;
    }>;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export declare const useToast: () => ToastContextType;
export {};
