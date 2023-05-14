import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useRotate = (isCurrent: boolean, value: string | undefined) => {
  const rotateRef = useRef(new Animated.Value(0)).current;

  const rotateAnimation = useCallback(() => {
    if (!isCurrent && value) {
      Animated.timing(rotateRef, {
        toValue: 1,
        useNativeDriver: true,
        duration: 600,
      }).start();
    }
  }, [isCurrent]);

  useEffect(() => {
    rotateAnimation();
    return () => rotateRef.resetAnimation();
  }, [isCurrent]);

  const rotate = rotateRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return { rotate };
};
