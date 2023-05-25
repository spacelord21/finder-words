import { TGameCondition, TGameMode } from "../../../types";
import { createEvent, createStore, sample } from "effector";

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
