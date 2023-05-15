import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useLetterAppearance = (value: string | undefined) => {
  const opacityRef = useRef(new Animated.Value(0)).current;

  const appearanceAnimation = useCallback(() => {
    if (value) {
      Animated.timing(opacityRef, {
        toValue: 1,
        useNativeDriver: true,
        duration: 50,
      }).start();
    }
  }, [value]);

  useEffect(() => {
    appearanceAnimation();
    return () => opacityRef.resetAnimation();
  }, [value]);

  return { opacityRef };
};
