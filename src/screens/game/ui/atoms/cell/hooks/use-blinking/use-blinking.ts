import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useBlinking = () => {
  const blinking = useRef(new Animated.Value(1)).current;

  const blinkingAnim = () => {
    Animated.loop(
      Animated.timing(blinking, {
        toValue: 0,
        useNativeDriver: true,
        duration: 600,
        delay: 200,
      })
    ).start();
  };

  useEffect(() => {
    blinkingAnim();
  }, [blinking]);

  return { blinking };
};
