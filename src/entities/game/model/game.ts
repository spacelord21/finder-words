import { TGameCondition, TGameMode } from "@entities/types";
import { createEffect, createEvent, createStore } from "effector";
import { getRandomWord } from "../api";

export const setGameMode = createEvent<TGameMode>();
export const $gameMode = createStore<TGameMode>("4_LETTERS").on(
  setGameMode,
  (_, mode) => mode
);

const initialGameState: TGameState = {
  attempt: 0,
  previousGuesses: [],
  word: "слой",
  correctLetters: [],
  wrong: [],
  wrongPlaceLetters: [],
};

export type TGameState = {
  word: string;
  attempt: number;
  previousGuesses: string[];
  correctLetters: string[];
  wrongPlaceLetters: string[];
  wrong: string[];
};

export const setGameCondition = createEvent<TGameCondition>();
export const $gameCondition = createStore<TGameCondition>("NOTSTARTED").on(
  setGameCondition,
  (_, condition) => condition
);
export const $gameState = createStore<TGameState>(initialGameState);
export const getRandomWordFx = createEffect<number, string, Error>(
  async (letters) => {
    return await getRandomWord(letters);
  }
);

export const checkGuess = createEvent<string>();
export const setGameWord = createEvent<string>();

$gameState.on(checkGuess, (state, guess) => {
  if (state.word === guess) {
    return initialGameState;
  }
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
});

setGameMode.watch(() => {
  setGameCondition("INPROGRESS");
});
