import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
  split,
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
  TStorageGameState,
  gameInfoByMode,
} from "../../../types";
import { $guess, enterPress, resetGuess } from "../keyboard/model";
import { $dictionary } from "../dictionaries";
import { checkGuessHandler } from "./check-guess";
import { initialGameState } from "./initial-state";
import {
  fetchGameStateFromStorage,
  saveGameStateToStorage,
} from "./storage-methods";
import { setShownAlert } from "@entities/alert";

export const $gameState = createStore<TGameState>(initialGameState);
export const checkGuess = createEvent<string>();
export const setGameState = createEvent<TGameState>();

export const checkStorageFx = createEffect<TGameMode, TStorageGameState>(
  async (mode) => {
    return await fetchGameStateFromStorage(mode);
  }
);

/* 
  ALL EVENTS: 
   1) check guess
   2) set game state
   3) reset guess
   4) set game mode
   5) set game condition
   6) enter press
   7) save state
   8) set shown game results window
   9) set guess
   9) check storage

   in game proccess order:
    1) set game mode -> check storage -> set game state -> check guess -> save state 
*/

// check async storage after game mode set (1st in the order game proccess)
forward({
  from: setGameMode,
  to: checkStorageFx,
});

// if game not finished => game will be continue (2nd in the order proccess)

// forward({
//   from: checkStorageFx.doneData,
//   to: setGameState,
// });

checkStorageFx.doneData.watch((payload) => {
  setGameState(payload.state);
  setGameCondition(payload.condition);
});

// set game state (3rd in the order)
$gameState.on(setGameState, (state, payload) => {
  return payload;
});

// check guess
$gameState.on(checkGuess, (state, guess) => {
  return checkGuessHandler(state, guess);
});

// reset guess after check guess
forward({
  from: checkGuess,
  to: resetGuess,
});

// checking WIN and LOSE after check guess
sample({
  clock: checkGuess,
  source: $gameState,
  fn: (gameState, guess): TGameCondition => {
    if (guess == gameState.word) return "WIN";
    if (gameState.attempt == gameInfoByMode[$gameMode.getState()].attempts) {
      return "LOSE";
    }
    return "INPROGRESS";
  },
  target: setGameCondition,
});

// checking word length and containing in dictionary

const checkLength = sample({
  clock: enterPress,
  source: $guess,
  fn: (guess, _) => guess.length == $gameState.getState().word.length,
});

const checkInDictionary = sample({
  clock: checkLength,
  source: $guess,
  fn: (guess, _) =>
    guess.length == $gameState.getState().word.length &&
    $dictionary.getState()[$gameMode.getState()].includes(guess),
});

guard({
  clock: checkInDictionary,
  source: $guess,
  filter: (guess, checked) => {
    return checked;
  },
  target: checkGuess,
});

guard({
  clock: checkInDictionary,
  source: checkLength,
  filter: (isCorrectLength, checked) => {
    return !checked && isCorrectLength;
  },
  target: setShownAlert,
});

export const saveState = createEvent();

// set state in async storage after check guess
forward({
  from: checkGuess,
  to: saveState,
});

export const saveGameStateFx = createEffect<void, void>(async () => {
  const gameState = $gameState.getState();
  const mode = $gameMode.getState();
  const condition = $gameCondition.getState();
  return await saveGameStateToStorage(gameState, mode, condition);
});

forward({
  from: saveState,
  to: saveGameStateFx,
});
