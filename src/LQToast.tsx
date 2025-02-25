import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Keyboard,
} from "react-native";

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

const iconsMap = {
    success: <Text>✅</Text>,
    error: <Text>❌</Text>,
    warning: <Text>⚠️</Text>,
    default: <Text></Text>,
};

const LQToast: React.FC<LQToastProps> = ({
    title,
    description,
    variant = "default",
    isVisible,
    position = "top",
    duration,
    offsetTop = 60,
    offsetBottom = 100,
    animationType = "slide",
    onDismiss,
    customToastComponent: CustomComponent,
}) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [toastHeight, setToastHeight] = useState(0); // State to store toast height

    useEffect(() => {
        if (position === "bottom") {
            const keyboardDidShowListener = Keyboard.addListener(
                "keyboardDidShow",
                (event) => setKeyboardHeight(event.endCoordinates.height)
            );

            const keyboardDidHideListener = Keyboard.addListener(
                "keyboardDidHide",
                () => setKeyboardHeight(0)
            );

            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }
    }, [position]);

    useEffect(() => {
        slideAnim.setValue(0);
        fadeAnim.setValue(0);
    }, [animationType, position]);

    useEffect(() => {
        if (position === "center" || animationType === "fade") {
            Animated.timing(fadeAnim, {
                toValue: isVisible ? 1 : 0,
                duration,
                useNativeDriver: true,
            }).start();
        } else {
            const initialTranslateY =
                position === "top"
                    ? -offsetTop - toastHeight
                    : offsetBottom + toastHeight;

            slideAnim.setValue(initialTranslateY);

            Animated.timing(slideAnim, {
                toValue: isVisible
                    ? position === "top"
                        ? offsetTop
                        : -offsetBottom
                    : initialTranslateY,
                duration,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, position, offsetTop, offsetBottom, toastHeight]);

    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setToastHeight(height);
    };

    if (CustomComponent) {
        return (
            <Animated.View
                onLayout={handleLayout}
                style={[
                    styles.toastContainer,
                    position === "center" && styles.centerContainer,
                    {
                        transform: [
                            position === "center" || animationType === "fade"
                                ? { translateY: 0 }
                                : { translateY: slideAnim },
                        ],
                        opacity:
                            position === "center" || animationType === "fade"
                                ? fadeAnim
                                : 1,
                        [position]:
                            position === "bottom"
                                ? keyboardHeight > 0
                                    ? keyboardHeight + offsetBottom
                                    : offsetBottom
                                : position === "top"
                                ? offsetTop
                                : undefined,
                    },
                ]}
            >
                <CustomComponent onDismiss={onDismiss} />
            </Animated.View>
        );
    }

    return (
        <Animated.View
            onLayout={handleLayout}
            style={[
                styles.toastContainer,
                styles[variant],
                position === "center" && styles.centerContainer,
                {
                    transform: [
                        position === "center" || animationType === "fade"
                            ? { translateY: 0 }
                            : { translateY: slideAnim },
                    ],
                    opacity:
                        position === "center" || animationType === "fade"
                            ? fadeAnim
                            : 1,
                    [position]:
                        position === "bottom"
                            ? keyboardHeight > 0
                                ? keyboardHeight + offsetBottom
                                : offsetBottom
                            : position === "top"
                            ? offsetTop
                            : undefined,
                },
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
    },
    centerContainer: {
        top: "50%",
        marginTop: -25, // Adjust based on the height of the toast
        alignSelf: "center",
    },
    success: { backgroundColor: "#EFFAF6" },
    error: { backgroundColor: "#FDEDF0" },
    warning: { backgroundColor: "#FFF3CD" },
    default: { backgroundColor: "#fff" },
    title: { fontSize: 15, fontWeight: "700", color: "#0A0D14" },
    description: { color: "#64748B", fontSize: 15, fontWeight: "500" },
});
