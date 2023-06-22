import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { useTheme } from "styled-components";

type THookArgs = {
  value?: string;
  isCurrentRow?: boolean;
  index: number;
  guess: string;
  rightWord: string;
};

export const useCellColor = ({
  index,
  isCurrentRow,
  value,
  guess,
  rightWord: word,
}: THookArgs) => {
  const theme = useTheme();
  const rightPlace = theme.palette.gameboard.rightPlace;
  const wrongPlace = theme.palette.gameboard.wrongPlace;
  const wrongColor = theme.palette.gameboard.wrong;
  const defaultColor = theme.palette.gameboard.default;
  const whiteLetter = "#FFFFFF";
  const darkLetter = theme.palette.text.dark;

  const color = useMemo(() => {
    if (!value) return defaultColor;
    if (!isCurrentRow) {
      const wordArray = word.split("");
      if (wordArray[index] == value) return rightPlace;
      if (wordArray[index] != value) {
        if (wordArray.includes(value)) {
          const guessArray = guess.split("");
          const sameLettersInRight = wordArray.filter(
            (item, index) => item === value && wordArray[index] != item
          ).length;
          let j = 0;
          const sameLettersInGuess = guess
            .split("")
            .filter(
              (item, index) => item === wordArray[index] && item === value
            ).length;
          let shouldPaint = true;
          for (let i = 0; i <= index; i++) {
            if (j > sameLettersInRight - sameLettersInGuess) {
              shouldPaint = false;
              break;
            }
            if (guessArray[i] == value) {
              j++;
            }
          }
          if (shouldPaint) return wrongPlace;
        }
      }

      return wrongColor;
    }
    return defaultColor;
  }, [value, isCurrentRow]);

  const letterColor = useMemo(() => {
    if (theme.name == "dark") return whiteLetter;
    if (!isCurrentRow) {
      return whiteLetter;
    }
    return darkLetter;
  }, [isCurrentRow]);

  return { color, letterColor };
};
