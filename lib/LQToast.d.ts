import React from "react";
interface LQToastProps {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning" | "default";
    isVisible: boolean;
    duration?: number;
    offsetTop?: number;
    offsetBottom?: number;
    position?: "top" | "bottom" | "center";
    animationType?: "slide" | "fade";
    onDismiss: () => void;
    customToastComponent?: React.FC<{
        animationStyle?: any;
        onDismiss: () => void;
    }>;
}
declare const LQToast: React.FC<LQToastProps>;
export default LQToast;
