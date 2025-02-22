import React from "react";
interface LQToastProps {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning";
    isVisible: boolean;
    duration?: number;
    direction?: "top" | "bottom";
    onDismiss: () => void;
    customComponent?: React.FC<{
        animationStyle: any;
        onDismiss: () => void;
    }>;
}
declare const LQToast: React.FC<LQToastProps>;
export default LQToast;
