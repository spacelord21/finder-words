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
  // const { word } = useStore($gameState);
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
      let quantityLikeValue = 0;
      let quantityValueInGuess = 0;
      wordArray.forEach((item, _) => {
        if (item === value) quantityLikeValue++;
      });
      guess.split("").forEach((item, i) => {
        if (item === value) quantityValueInGuess++;
      });
      if (
        wordArray[index] != value &&
        quantityLikeValue >= quantityValueInGuess
      ) {
        if (wordArray.includes(value)) return wrongPlace;
      }
      if (wordArray[index] == value) return rightPlace;

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
