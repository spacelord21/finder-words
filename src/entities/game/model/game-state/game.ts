import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
} from "effector";
import {
  $gameCondition,
  $gameMode,
  setGameCondition,
  setGameMode,
} from "../game-processes";
import {
  TGameCondition,
  TGameMode,
  TGameState,
  gameInfoByMode,
} from "../../../types";
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

export const checkStorageFx = createEffect<TGameMode, TGameState>(
  async (mode) => {
    return await fetchGameStateFromStorage(mode);
  }
);

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

export const saveState = createEvent();

const fetchGameStateFromStorage = async (mode: TGameMode) => {
  const value = await AsyncStorage.getItem(mode);
  if (value) {
    const result: TGameState = JSON.parse(value);
    if (result.attempt !== gameInfoByMode[mode].attempts) {
      return result;
    }
    await AsyncStorage.removeItem(mode);
  }
  const array = $targets.getState()[mode];
  return { ...initialGameState, word: array[getRandomInt(array.length)] };
};

forward({
  from: checkStorageFx.doneData,
  to: setGameState,
});

const saveGameStateToStorage = async () => {
  const gameState = $gameState.getState();
  const mode = $gameMode.getState();
  const condition = $gameCondition.getState();
  if (condition === "INPROGRESS" || condition === "NOTSTARTED") {
    await AsyncStorage.setItem(mode, JSON.stringify(gameState));
  }
};

export const saveGameStateFx = createEffect<void, void>(async () => {
  return saveGameStateToStorage();
});

forward({
  from: saveState,
  to: saveGameStateFx,
});
