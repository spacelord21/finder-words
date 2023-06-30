import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TGameState,
  TGameMode,
  TGameCondition,
  TStorageGameState,
} from "../../../types";
import { $targets } from "../dictionaries";
import { initialGameState } from "./initial-state";

const isCorrectState = (condition: TGameCondition) => {
  return condition == "INPROGRESS";
};

export const fetchGameStateFromStorage = async (
  mode: TGameMode
): Promise<TStorageGameState> => {
  const value = await AsyncStorage.getItem(mode);
  if (value) {
    const result: TStorageGameState = await JSON.parse(value);
    if (isCorrectState(result.condition)) {
      return result;
    }
  }
  const array = $targets.getState()[mode];
  return {
    state: { ...initialGameState, word: array[getRandomInt(array.length)] },
    condition: "INPROGRESS",
  };
};

export const saveGameStateToStorage = async (
  gameState: TGameState,
  mode: TGameMode,
  condition: TGameCondition
): Promise<void> => {
  await AsyncStorage.setItem(
    mode,
    JSON.stringify({ state: gameState, condition: condition })
  );
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
