// enter is ">", delete is "<"
type TKeyboard = {
  [key: string]: string[];
};

export const keyboard: TKeyboard = {
  firstLevel: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  secondLevel: ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
  thirdLevel: ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "<"],
};
