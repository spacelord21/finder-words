import { createEvent, createStore } from "effector";
import { $gameState } from "../game-state";

export const setGuess = createEvent<string>();
export const enterPress = createEvent();
export const resetGuess = createEvent();
export const $guess = createStore<string>("").on(resetGuess, (_, __) => "");

$guess.on(setGuess, (state, content) => {
  switch (content) {
    case "<": {
      return state.slice(0, state.length - 1);
    }
    default: {
      return state.length == $gameState.getState().word.length
        ? state
        : state + content;
    }
  }
});
