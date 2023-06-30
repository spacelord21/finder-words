export type TCategory = {
  title: string;
  mode: TGameMode;
};

export type TGameMode = "5_LETTERS" | "4_LETTERS" | "6_LETTERS";

type TGameInfo = {
  attempts: number;
  letters: number;
};

type TGameInfoByMode = {
  [key in TGameMode]: TGameInfo;
};

export const gameInfoByMode: TGameInfoByMode = {
  "5_LETTERS": {
    attempts: 6,
    letters: 5,
  },
  "4_LETTERS": {
    attempts: 5,
    letters: 4,
  },
  "6_LETTERS": {
    attempts: 7,
    letters: 6,
  },
};

export type TGameCondition = "WIN" | "LOSE" | "INPROGRESS" | "NOTSTARTED";

export type TWordResponse = {
  text: string;
  pos?: string;
};
export type TWordVerificationResponse = {
  head: {};
  def: TWordResponse[];
};

export type TDictonary = {
  [key in TGameMode]: string[];
};

export type TGameState = {
  word: string;
  attempt: number;
  previousGuesses: string[];
  correctLetters: string[];
  wrongPlaceLetters: string[];
  wrong: string[];
};

export type TStorageGameState = {
  state: TGameState;
  condition: TGameCondition;
};
