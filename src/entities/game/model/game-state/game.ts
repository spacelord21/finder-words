import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
} from "effector";
import { $gameMode, setGameCondition, setGameMode } from "../game-processes";
import {
  TGameCondition,
  TGameMode,
  TGameState,
  gameInfoByMode,
} from "../../../types";
import { persist } from "effector-storage/rn/async";
import { $guess, enterPress, resetGuess } from "../keyboard/model";
import { $dictionary, $targets } from "../dictionaries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkGuessHandler } from "./check-guess";

const initialGameState: TGameState = {
  attempt: 0,
  previousGuesses: [],
  word: "слой",
  correctLetters: [],
  wrong: [],
  wrongPlaceLetters: [],
};

export const $gameState = createStore<TGameState>(initialGameState);
export const checkGuess = createEvent<string>();
export const setGameState = createEvent<TGameState>();

const checkStorageFx = createEffect<TGameMode, TGameState>(async (mode) => {
  return await fetchGameStateFromStorage(mode);
});

$gameState.on(setGameState, (state, payload) => {
  return payload;
});
$gameState.on(checkGuess, (state, guess) => {
  return checkGuessHandler(state, guess);
});

forward({
  from: checkGuess,
  to: resetGuess,
});

forward({
  from: setGameMode,
  to: checkStorageFx,
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

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

guard({
  clock: enterPress,
  source: $guess,
  filter: (guess, _) => {
    return (
      guess.length == $gameState.getState().word.length &&
      $dictionary.getState()[$gameMode.getState()].includes(guess)
    );
  },
  target: checkGuess,
});

persist({
  store: $gameState,
  key: $gameMode.getState(),
});

const fetchGameStateFromStorage = async (mode: TGameMode) => {
  const value = await AsyncStorage.getItem(mode);
  if (value) return JSON.parse(value);
  const array = $targets.getState()[mode];
  return { ...initialGameState, word: array[getRandomInt(array.length)] };
};

forward({
  from: checkStorageFx.doneData,
  to: setGameState,
});

export const resetState = createEvent();
$gameState.on(resetState, (state, payload) => initialGameState);
