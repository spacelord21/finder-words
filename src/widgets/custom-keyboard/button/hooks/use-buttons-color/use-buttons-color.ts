import { useTheme } from "styled-components";

export const useButtonsColor = (button: string) => {
  const theme = useTheme();
  const notLettersColor =
    button === ">"
      ? theme.palette.keyboard.enter
      : button === "<"
      ? theme.palette.keyboard.backspace
      : null;
  const letterColor = theme.palette.text.dark;
  return { letterColor, notLettersColor };
};
