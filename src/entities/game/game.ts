import { TGameCondition, TGameMode } from "@entities/types";
import { createEvent, createStore } from "effector";

export const setGameMode = createEvent<TGameMode>();
export const $gameMode = createStore<TGameMode | null>(null).on(
  setGameMode,
  (_, mode) => mode
);

const initialGameState: TGameState = {
  attempt: 0,
  previousGuesses: [],
  word: "волк",
};

export type TGameState = {
  word: string;
  attempt: number;
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
  word: "волк",
});

export const checkGuess = createEvent<string>();
export const setGameWord = createEvent<string>();

$gameState.on(checkGuess, (state, guess) => {
  if (state.word === guess) {
    return initialGameState;
  }
  return {
    attempt: state.attempt + 1,
    previousGuesses: [...state.previousGuesses, guess],
    word: state.word,
  };
});

setGameMode.watch(() => {
  setGameCondition("INPROGRESS");
});
