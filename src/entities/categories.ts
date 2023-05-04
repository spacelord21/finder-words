export const categories: TCategory[] = [
  {
    title: "3 буквы",
    type: "3_LETTERS",
  },
  {
    title: "4 буквы",
    type: "4_LETTERS",
  },
];

export type TCategory = {
  title: string;
  type: TGameMode;
};

export type TGameMode = "3_LETTERS" | "4_LETTERS";
