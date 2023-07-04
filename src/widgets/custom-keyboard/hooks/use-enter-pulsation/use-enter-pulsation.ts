import { $gameMode } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { useStore } from "effector-react";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useEnterPulsation = (guess: string) => {
  const scaleRef = useRef(new Animated.Value(0)).current;
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode[mode];

  const pulsatingAnimation = useCallback(() => {
    if (guess.length === gameInfo.letters) {
      Animated.loop(
        Animated.timing(scaleRef, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1500,
          easing: Easing.bounce,
        })
      ).start();
    }
  }, [guess]);

  useEffect(() => {
    pulsatingAnimation();
    return () => scaleRef.resetAnimation();
  }, [guess]);

  const pulsating = scaleRef.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return { pulsating };
};
