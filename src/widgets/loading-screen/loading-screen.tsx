import { useEffect, useState } from "react";
import { RowCells } from "@screens/game/ui";
import { Container } from "./styles";

let interval: ReturnType<typeof setInterval>;
let timeout: ReturnType<typeof setTimeout>;

const word = "загрузка";
const LETTER_CHANGE_COLOR_DURATION = 180;
const WORD_LENGTH = 8;

export const LoadingScreen = () => {
  const [guess, setGuess] = useState("");

  useEffect(() => {
    if (guess.length != word.length) {
      interval = setInterval(() => {
        setGuess((prev) => prev + word.split("")[prev.length]);
      }, 300);
    } else {
      timeout = setTimeout(() => {
        setGuess("");
      }, LETTER_CHANGE_COLOR_DURATION * WORD_LENGTH);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [guess]);

  return (
    <Container>
      <RowCells
        cellHeight={50}
        cellWidth={30}
        isCurrent={guess.length != word.length}
        rightWord="загрузка"
        word={guess}
        wordLength={8}
      />
    </Container>
  );
};
