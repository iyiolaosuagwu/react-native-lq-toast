"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const iconsMap = {
    success: <react_native_1.Text>✅</react_native_1.Text>,
    error: <react_native_1.Text>❌</react_native_1.Text>,
    warning: <react_native_1.Text>⚠️</react_native_1.Text>,
};
const LQToast = ({ title, description, variant = "success", isVisible, onDismiss, }) => {
    const slideAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(-100)).current;
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            react_native_1.Animated.timing(slideAnim, {
                toValue: 60,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
        else {
            react_native_1.Animated.timing(slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);
    if (!isVisible)
        return null;
    return (<react_native_1.Animated.View style={[
            styles.toastContainer,
            styles[variant],
            { transform: [{ translateY: slideAnim }] },
        ]}>
            {iconsMap[variant]}
            <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
                <react_native_1.Text style={styles.description}>{description}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.TouchableOpacity onPress={onDismiss}>
                <react_native_1.Text style={{ fontWeight: "bold" }}>✖</react_native_1.Text>
            </react_native_1.TouchableOpacity>
        </react_native_1.Animated.View>);
};
exports.default = LQToast;
const styles = react_native_1.StyleSheet.create({
    toastContainer: {
        position: "absolute",
        paddingHorizontal: 10,
        paddingVertical: 13,
        right: 20,
        left: 20,
        borderRadius: 5,
        zIndex: 99999,
        flexDirection: "row",
        gap: 10,
    },
    success: { backgroundColor: "#EFFAF6", top: 10 },
    error: { backgroundColor: "#FDEDF0", top: 10 },
    warning: { backgroundColor: "yellow", top: 10 },
    title: { fontSize: 15, fontWeight: "700", color: "#0A0D14" },
    description: { color: "#64748B", fontSize: 15, fontWeight: "500" },
});
