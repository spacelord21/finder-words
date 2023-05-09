import { TGameCondition, TGameMode } from "@entities/types";
import { createEvent, createStore, sample } from "effector";

export const setGameMode = createEvent<TGameMode>();
export const $gameMode = createStore<TGameMode | null>(null).on(
  setGameMode,
  (_, mode) => mode
);

const initialGameState: TGameState = {
  attempt: 0,
  notRightPlace: [],
  previousGuesses: [],
  right: [],
  word: "",
  wrong: [],
};

export type TGameState = {
  word: string;
  attempt: number;
  right: string[];
  wrong: string[];
  notRightPlace: string[];
  previousGuesses: string[];
};

export const setGameCondition = createEvent<TGameCondition>();
export const $gameCondition = createStore<TGameCondition>("NOTSTARTED").on(
  setGameCondition,
  (_, condition) => condition
);
export const $gameState = createStore<TGameState>({
  previousGuesses: [],
  attempt: 0,
  notRightPlace: [],
  right: [],
  word: "волк",
  wrong: [],
});

export const checkGuess = createEvent<string>();
export const setGameWord = createEvent<string>();

$gameState.on(checkGuess, (state, guess) => {
  if (state.word === guess) {
    // win case
    setGameCondition("WIN");
    return initialGameState;
  }
  const guessArray = guess.split("");
  const wordArray = state.word.split("");
  let right = [];
  let wrongSet = new Set<string>();
  let wrongPlace = [];
  for (let i = 0; i < wordArray.length; i++) {
    for (let j = 0; j < guessArray.length; j++) {
      if (i === j) {
        if (wordArray[i] === guessArray[j]) {
          right.push(guessArray[j]);
        } else {
          wrongSet.add(guessArray[j]);
        }
      } else {
        if (wordArray[i] === guessArray[j]) {
          wrongPlace.push(guessArray[j]);
        } else {
          wrongSet.add(guessArray[j]);
        }
      }
    }
  } // заполняю массивы
  let resultWrong: string[] = [];
  wrongSet.forEach((item) => {
    resultWrong.push(item);
  });
  resultWrong = clearSame(resultWrong);
  let resultRight = clearSame(right);
  let resultWrongPlace = clearSame(wrongPlace);
  return {
    attempt: state.attempt + 1,
    notRightPlace: resultWrongPlace,
    previousGuesses: [...state.previousGuesses, guess],
    right: resultRight,
    word: state.word,
    wrong: resultWrong,
  };
});

setGameMode.watch(() => {
  setGameCondition("INPROGRESS");
});

const clearSame = (arr: string[]): string[] => {
  const arraysCombination: string[] = [...arr, ...$gameState.getState().right];
  let resultSet = new Set<string>(arraysCombination);
  const result: string[] = [];
  resultSet.forEach((item) => {
    result.push(item);
  });
  return result;
};
