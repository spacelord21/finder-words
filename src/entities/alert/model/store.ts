import { createEvent, createStore } from "effector";

export const setShownAlert = createEvent<boolean>();
export const $shownAlert = createStore(false).on(
  setShownAlert,
  (state, payload) => payload
);
