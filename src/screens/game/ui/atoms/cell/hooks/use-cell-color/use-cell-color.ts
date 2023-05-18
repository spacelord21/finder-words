import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { useTheme } from "styled-components";

type THookArgs = {
  value?: string;
  isCurrentRow?: boolean;
  isCurrentCell?: boolean;
  index: number;
  guess: string;
};

export const useCellColor = ({
  index,
  isCurrentCell,
  isCurrentRow,
  value,
  guess,
}: THookArgs) => {
  const { word } = useStore($gameState);
  const theme = useTheme();
  const green = theme.palette.accent.success;
  const yellow = theme.palette.accent.wrongPlace;
  const wrongColor = theme.palette.keyboard.backspace;
  const defaultColor = theme.palette.background.tertiary;

  const color = useMemo(() => {
    if (!value) return defaultColor;
    if (!isCurrentRow) {
      const wordArray = word.split("");
      if (wordArray[index] != value) {
        let quantityLikeValue = 0;
        let quantityValueInGuess = 0;
        wordArray.forEach((item, _) => {
          if (item === value) quantityLikeValue++;
        });
        guess.split("").forEach((item, i) => {
          if (item === value && i <= index) quantityValueInGuess++;
        });
        if (
          wordArray.includes(value) &&
          quantityLikeValue >= quantityValueInGuess
        )
          return yellow;
      }
      if (wordArray[index] == value) return green;

      return wrongColor;
    }
    return defaultColor;
  }, [value, isCurrentRow]);

  return { color };
};
