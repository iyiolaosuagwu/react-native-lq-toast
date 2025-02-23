import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, TouchableOpacity, Text, Keyboard, } from "react-native";
const iconsMap = {
    success: <Text>✅</Text>,
    error: <Text>❌</Text>,
    warning: <Text>⚠️</Text>,
    default: <Text></Text>,
};
const LQToast = ({ title, description, variant = "default", isVisible, direction = "top", duration, offsetTop = 60, offsetBottom = 100, keyboardOffset = 0, onDismiss, customComponent: CustomComponent, }) => {
    const slideAnim = useRef(new Animated.Value(direction === "top" ? -offsetTop - 100 : offsetBottom + 100)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    useEffect(() => {
        if (direction === "bottom") {
            const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => setKeyboardHeight(event.endCoordinates.height));
            const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0));
            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }
    }, [direction]);
    // useEffect(() => {
    //     Animated.timing(slideAnim, {
    //         toValue: isVisible
    //             ? direction === "top"
    //                 ? offsetTop
    //                 : -offsetBottom
    //             : direction === "top"
    //             ? -offsetTop - 100
    //             : offsetBottom + 100,
    //         duration,
    //         useNativeDriver: true,
    //     }).start();
    // }, [isVisible, direction, offsetTop, offsetBottom]);
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible
                ? direction === "top"
                    ? offsetTop
                    : -(offsetBottom + keyboardHeight + keyboardOffset) // ✅ Apply keyboardOffset
                : direction === "top"
                    ? -offsetTop - 100
                    : offsetBottom + 100,
            duration,
            useNativeDriver: true,
        }).start();
    }, [
        isVisible,
        direction,
        offsetTop,
        offsetBottom,
        keyboardHeight,
        keyboardOffset,
    ]);
    if (CustomComponent) {
        return (<Animated.View style={[
                styles.toastContainer,
                {
                    transform: [{ translateY: slideAnim }],
                    [direction]: direction === "bottom"
                        ? keyboardHeight > 0
                            ? keyboardHeight +
                                offsetBottom +
                                keyboardOffset // ✅ Adjusted for keyboardOffset
                            : offsetBottom
                        : offsetTop,
                },
            ]}>
                <CustomComponent onDismiss={onDismiss}/>
            </Animated.View>);
    }
    return (<Animated.View style={[
            styles.toastContainer,
            styles[variant],
            {
                transform: [{ translateY: slideAnim }],
                [direction]: direction === "bottom"
                    ? keyboardHeight > 0
                        ? keyboardHeight + offsetBottom + keyboardOffset // ✅ Adjusted for keyboardOffset
                        : offsetBottom
                    : offsetTop,
            },
        ]}>
            {iconsMap[variant]}
            <View style={{ flex: 1, gap: 3 }}>
                {title && <Text style={styles.title}>{title}</Text>}
                {description && (<Text style={styles.description}>{description}</Text>)}
            </View>
            <TouchableOpacity style={{ marginRight: 3 }} onPress={onDismiss}>
                <Text>✖</Text>
            </TouchableOpacity>
        </Animated.View>);
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
    success: { backgroundColor: "#EFFAF6" },
    error: { backgroundColor: "#FDEDF0" },
    warning: { backgroundColor: "#FFF3CD" },
    default: { backgroundColor: "#fff" },
    title: { fontSize: 15, fontWeight: "700", color: "#0A0D14" },
    description: { color: "#64748B", fontSize: 15, fontWeight: "500" },
});
