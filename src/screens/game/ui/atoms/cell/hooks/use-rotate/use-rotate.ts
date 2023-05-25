import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useRotate = (
  isCurrent: boolean,
  value: string | undefined,
  index: number
) => {
  const rotateRef = useRef(new Animated.Value(0)).current;
  const [readyToChangeColor, setReady] = useState(false);

  const rotateAnimation = useCallback(() => {
    if (!isCurrent && value) {
      Animated.timing(rotateRef, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start();
      setReady(true);
    }
  }, [isCurrent]);

  useEffect(() => {
    setTimeout(() => {
      rotateAnimation();
    }, index * 300);
    return () => rotateRef.resetAnimation();
  }, [isCurrent]);

  const rotate = rotateRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return { rotate, readyToChangeColor };
};
