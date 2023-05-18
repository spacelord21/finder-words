import { TGameCondition, TGameMode } from "@entities/types";
import { createEvent, createStore, sample } from "effector";
import { $gameState, checkGuess, getRandomWordFx } from "../game-state";

export const setGameCondition = createEvent<TGameCondition>();
export const $gameCondition = createStore<TGameCondition>("LOSE").on(
  setGameCondition,
  (_, condition) => condition
);

export const setGameMode = createEvent<TGameMode>();
export const $gameMode = createStore<TGameMode>("4_LETTERS").on(
  setGameMode,
  (_, mode) => mode
);

setGameMode.watch(() => {
  setGameCondition("INPROGRESS");
});

sample({
  clock: checkGuess,
  source: $gameState,
  fn: (gameState, guess): TGameCondition => {
    if (guess == gameState.word) return "WIN";
    if (gameState.attempt > gameState.word.length) {
      return "LOSE";
    }
    return "INPROGRESS";
  },
  target: setGameCondition,
});

export const setShownGameResults = createEvent<boolean>();
export const $gameResultsShown = createStore<boolean>(true).on(
  setShownGameResults,
  (_, payload) => payload
);

sample({
  clock: setGameCondition,
  source: $gameCondition,
  fn: (_, condition) => {
    return condition == "LOSE" || condition == "WIN" ? true : false;
  },
  target: setShownGameResults,
});

sample({
  clock: getRandomWordFx.pending,
  fn: (): boolean => {
    return false;
  },
  target: setShownGameResults,
});

sample({
  clock: getRandomWordFx.pending,
  fn: (): TGameCondition => {
    return "NOTSTARTED";
  },
  target: setGameCondition,
});
