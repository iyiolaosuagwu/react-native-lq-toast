import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from "react-native";

interface LQToastProps {
    title: string;
    description: string;
    variant?: "success" | "error" | "warning";
    isVisible: boolean;
    duration?: number;
    direction?: "top" | "bottom";
    onDismiss: () => void;
    customComponent?: React.FC<{ animationStyle: any; onDismiss: () => void }>; // Allow custom component
}

const iconsMap = {
    success: <Text>✅</Text>,
    error: <Text>❌</Text>,
    warning: <Text>⚠️</Text>,
};

const LQToast: React.FC<LQToastProps> = ({
    title,
    description,
    variant = "success",
    isVisible,
    direction = "top",
    duration = 300,
    onDismiss,
    customComponent: CustomComponent,
}) => {
    const slideAnim = useRef(
        new Animated.Value(direction === "top" ? -100 : 100)
    ).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible
                ? direction === "top"
                    ? 60
                    : -60
                : direction === "top"
                ? -100
                : 100,
            duration,
            useNativeDriver: true,
        }).start();
    }, [isVisible, direction]);

    if (CustomComponent) {
        return (
            <CustomComponent
                animationStyle={{ transform: [{ translateY: slideAnim }] }}
                onDismiss={onDismiss}
            />
        );
    }

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                styles[variant],
                { transform: [{ translateY: slideAnim }], [direction]: 10 },
            ]}
        >
            {iconsMap[variant]}
            <View style={{ flex: 1, gap: 3 }}>
                {title && <Text style={styles.title}>{title}</Text>}
                {description && (
                    <Text style={styles.description}>{description}</Text>
                )}
            </View>
            <TouchableOpacity style={{ marginRight: 3 }} onPress={onDismiss}>
                <Text>✖</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default LQToast;

const styles = StyleSheet.create({
    toastContainer: {
        position: "absolute",
        paddingHorizontal: 10,
        paddingVertical: 13,
        right: 15,
        left: 15,
        borderRadius: 5,
        zIndex: 9999,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#EFFAF6",
    },
    success: { backgroundColor: "#EFFAF6" },
    error: { backgroundColor: "#FDEDF0" },
    warning: { backgroundColor: "#FFF3CD" },
    title: { fontSize: 15, fontWeight: "700", color: "#0A0D14" },
    description: { color: "#64748B", fontSize: 15, fontWeight: "500" },
});
