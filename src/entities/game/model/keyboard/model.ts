import { createEvent, createStore } from "effector";

export const setGuess = createEvent<string>();
export const enterPress = createEvent();
export const resetGuess = createEvent();
export const $guess = createStore<string>("").on(resetGuess, (_, __) => "");
