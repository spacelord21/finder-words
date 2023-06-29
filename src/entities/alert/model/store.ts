import { createEvent, createStore, sample } from "effector";

export const setShownAlert = createEvent<boolean>();
export const $shownAlert = createStore(false).on(
  setShownAlert,
  (state, payload) => payload
);

setShownAlert.watch((payload) => {
  if (payload) {
    setTimeout(() => {
      setShownAlert(false);
    }, 2000);
  }
});
