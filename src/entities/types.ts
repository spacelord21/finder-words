export type TCategory = {
  title: string;
  mode: TGameMode;
};

export type TGameMode = "3_LETTERS" | "4_LETTERS";

type TGameInfo = {
  attempts: number;
  letters: number;
};

type TGameInfoByMode = {
  [key in TGameMode]: TGameInfo;
};

export const gameInfoByMode: TGameInfoByMode = {
  "3_LETTERS": {
    attempts: 5,
    letters: 3,
  },
  "4_LETTERS": {
    attempts: 5,
    letters: 4,
  },
};

export type TGameCondition = "WIN" | "LOSE" | "INPROGRESS" | "NOTSTARTED";
