import { MAIN_URL } from "@shared/api";

export type TResponseWord = {
  word: string;
};

export const getRandomWord = async (
  letters: number
): Promise<TResponseWord> => {
  return await fetch(`${MAIN_URL}/words/random-word=${letters}`, {
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
