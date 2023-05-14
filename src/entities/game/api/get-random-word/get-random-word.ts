import { MAIN_URL } from "@shared/api";

export const getRandomWord = async (letters: number): Promise<string> => {
  return await fetch(`${MAIN_URL}/random-word=${letters}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result: string) => {
      return result;
    })
    .catch(() => {
      throw new Error("Ошибка запроса.");
    });
};
