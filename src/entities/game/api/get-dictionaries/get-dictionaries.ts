import { TDictonary } from "@entities/types";
import { MAIN_URL } from "@shared/api";

export const getDictionary = async (): Promise<TDictonary> => {
  return await fetch(`${MAIN_URL}/words/dictionary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error: Error) => {
      throw error;
    });
};

export const getTargets = async (): Promise<TDictonary> => {
  return await fetch(`${MAIN_URL}/words/targets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error: Error) => {
      throw error;
    });
};
