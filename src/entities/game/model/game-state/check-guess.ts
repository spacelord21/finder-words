import { TGameState } from "../../../types";

export const checkGuessHandler = (state: TGameState, guess: string) => {
  let wrong = [];
  let correct = [];
  let wrongPlace = [];
  const guessInLetters = guess.split("");
  const wordInLetters = state.word.split("");
  for (let i = 0; i < wordInLetters.length; i++) {
    for (let j = 0; j < wordInLetters.length; j++) {
      if (i == j && wordInLetters[i] == guessInLetters[j]) {
        correct.push(guessInLetters[j]);
        break;
      }
      if (i != j && wordInLetters[i] == guessInLetters[j]) {
        wrongPlace.push(guessInLetters[j]);
        break;
      }
      wrong.push(guessInLetters[j]);
    }
  }
  return {
    attempt: state.attempt + 1,
    previousGuesses: [...state.previousGuesses, guess],
    word: state.word,
    correctLetters: Array.from(new Set([...state.correctLetters, ...correct])),
    wrong: Array.from(new Set([...state.wrong, ...wrong])),
    wrongPlaceLetters: Array.from(
      new Set([...state.wrongPlaceLetters, ...wrongPlace])
    ),
  };
};
