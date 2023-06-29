import { TGameCondition } from "@entities/types";
import { useEffect, useRef } from "react";
import Confetti from "react-native-confetti";

export const useConfetti = (
  isResultsShown: boolean,
  condition: TGameCondition
) => {
  const confetti = useRef<Confetti | null>(null);

  useEffect(() => {
    if (confetti && confetti.current && isResultsShown && condition === "WIN") {
      confetti.current.startConfetti();
    }
    return () => confetti.current?.stopConfetti();
  }, [isResultsShown, confetti, condition]);

  return { confetti };
};
