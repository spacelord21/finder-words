import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const ANIMATION_DURATION = 1000;

export const useAnimation = () => {
  const appearanceRef = useRef(new Animated.Value(0)).current;

  const appearanceAnimation = useCallback(() => {
    Animated.timing(appearanceRef, {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }, []);

  useEffect(() => {
    appearanceAnimation();
    return () => appearanceRef.resetAnimation();
  }, []);

  const appearance = appearanceRef.interpolate({
    inputRange: [0, 0.1, 0.7, 0.76, 1],
    outputRange: [-120, 24, 24, 52, -120],
  });

  return { appearance };
};
