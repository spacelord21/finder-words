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
    const wordArray = word.split("");
    if (wordArray[index] == value) return rightPlace; // если есть и стоит на своем месте
    if (!wordArray.includes(value)) return wrongColor; // если нет буквы в слове
    const sameLettersInRightWord = wordArray.reduce(
      (amount, currentValue) => (value == currentValue ? ++amount : amount),
      0
    );
    const sameLettersInGuess = guess
      .split("")
      .reduce(
        (amount, currentValue) => (value == currentValue ? ++amount : amount),
        0
      );
    // поиск одинаковых букв в правильном и в геснутом слове, если их одинаково, то желтый цвет, если нет, то темный
    return sameLettersInGuess == sameLettersInRightWord
      ? wrongPlace
      : wrongColor;
  }, [value]);

  const letterColor = useMemo(() => {
    if (theme.name == "dark") return whiteLetter;
    if (!isCurrentRow) {
      return whiteLetter;
    }
    return darkLetter;
  }, [isCurrentRow]);

  return { color, letterColor };
};
