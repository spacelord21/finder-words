import { TGameCondition, TGameMode, gameInfoByMode } from "../../../types";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";

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

const RESULTS_SHOW_TIMEOUT =
  gameInfoByMode[$gameMode.getState()].letters * 300 + 200;

const timeoutFx = createEffect<void, boolean>(async () => {
  return new Promise((res) => {
    const condition = $gameCondition.getState();
    setTimeout(() => {
      condition == "LOSE" || condition == "WIN" ? res(true) : res(false);
    }, RESULTS_SHOW_TIMEOUT);
  });
});

forward({
  from: setGameCondition,
  to: timeoutFx,
});

sample({
  clock: timeoutFx.doneData,
  target: setShownGameResults,
});
