import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const ANIMATION_DURATION = 180;

export const useRotate = (
  isCurrent: boolean,
  value: string | undefined,
  index: number
) => {
  const scaleRef = useRef(new Animated.Value(0)).current;
  const [readyToChangeColor, setReady] = useState(false);

  const scaleYAnim = useCallback(() => {
    if (!isCurrent && value) {
      Animated.timing(scaleRef, {
        toValue: 1,
        useNativeDriver: true,
        duration: ANIMATION_DURATION,
      }).start();
      setReady(true);
    }
  }, [isCurrent]);

  useEffect(() => {
    setTimeout(() => {
      scaleYAnim();
    }, index * ANIMATION_DURATION);
    return () => {
      scaleRef.resetAnimation();
      setReady(false);
    };
  }, [isCurrent]);

  useEffect(() => {
    return () => {
      setReady(false);
    };
  }, [value]);

  const scaleAnimation = scaleRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return { scaleAnimation, readyToChangeColor };
};
