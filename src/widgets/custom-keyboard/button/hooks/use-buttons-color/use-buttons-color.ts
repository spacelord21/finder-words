import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { useTheme } from "styled-components";

export const useButtonsColor = (button: string) => {
  const theme = useTheme();
  const { correctLetters, wrong, wrongPlaceLetters } = useStore($gameState);
  const green = theme.palette.keyboard.green;
  const yellow = theme.palette.keyboard.yellow;
  const dark = theme.palette.keyboard.dark;
  const white = theme.palette.keyboard.white;
  const black = theme.palette.text.dark;
  const notLettersBackgroundColor =
    button === ">"
      ? theme.palette.keyboard.enter
      : button === "<"
      ? theme.palette.keyboard.backspace
      : null;
  const letterBackgroundColor = useMemo(() => {
    if (correctLetters.includes(button)) {
      return green;
    }
    if (wrongPlaceLetters.includes(button)) {
      return yellow;
    }
    if (wrong.includes(button)) {
      return dark;
    }
    return white;
  }, [correctLetters, wrong, wrongPlaceLetters]);

  const letterColor = useMemo(() => {
    if (letterBackgroundColor == white) {
      return black;
    }
    if (letterBackgroundColor == dark) {
      return white;
    }
    return white;
  }, [letterBackgroundColor]);

  return { letterBackgroundColor, notLettersBackgroundColor, letterColor };
};
