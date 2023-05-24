import { getDictionary, getTargets } from "../../api";
import { TDictonary } from "../../../types";
import { createEffect, createStore } from "effector";

export const getDictionariesFx = createEffect<void, TDictonary, Error>(
  async () => {
    return await getDictionary();
  }
);
export const getTargetsFx = createEffect<void, TDictonary, Error>(async () => {
  return await getTargets();
});
export const $dictionary = createStore<TDictonary>({
  "4_LETTERS": [],
  "5_LETTERS": [],
  "6_LETTERS": [],
}).on(getDictionariesFx.doneData, (state, payload) => payload);
export const $targets = createStore<TDictonary>({
  "4_LETTERS": [],
  "5_LETTERS": [],
  "6_LETTERS": [],
}).on(getTargetsFx.doneData, (state, payload) => payload);
