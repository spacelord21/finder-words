import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useLetterAppearance = (value: string | undefined) => {
  const scaleRef = useRef(new Animated.Value(0)).current;

  const scaleAnimation = useCallback(() => {
    Animated.timing(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.bounce,
    }).start();
  }, [value]);

  useEffect(() => {
    scaleAnimation();
    return () => scaleRef.resetAnimation();
  }, [value]);

  const appearance = scaleRef.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  return { appearance };
};
