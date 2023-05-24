import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { useTheme } from "styled-components";

export const useButtonsColor = (button: string) => {
  const theme = useTheme();
  const { correctLetters, wrong, wrongPlaceLetters } = useStore($gameState);
  const rightPlace = theme.palette.gameboard.rightPlace;
  const wrongPlace = theme.palette.gameboard.wrongPlace;
  const dark = theme.palette.gameboard.wrong;
  const defaultColor = theme.palette.gameboard.default;
  const white = "#FFFFFF";
  const black = theme.palette.gameboard.dark;
  const notLettersBackgroundColor =
    button === ">"
      ? theme.palette.gameboard.enter
      : button === "<"
      ? theme.name == "light"
        ? white
        : theme.palette.gameboard.backspace
      : null;
  const letterBackgroundColor = useMemo(() => {
    if (correctLetters.includes(button)) {
      return rightPlace;
    }
    if (wrongPlaceLetters.includes(button)) {
      return wrongPlace;
    }
    if (wrong.includes(button)) {
      return theme.name == "light" ? dark : defaultColor;
    }
    return theme.name == "light" ? white : theme.palette.gameboard.backspace;
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
