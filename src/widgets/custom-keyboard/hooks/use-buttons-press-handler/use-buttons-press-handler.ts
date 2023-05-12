import { $gameMode, checkGuess } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { useStore } from "effector-react";
import { useCallback } from "react";

export const useButtonsPressHandler = (
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode;
  const correctWordLength = gameInfo[mode].letters;
  const onPressHandler = useCallback(
    (button: string) => {
      switch (button) {
        case "<": {
          setValue((prev) => prev.slice(0, prev.length - 1));
          break;
        }
        case ">": {
          setValue((prev) =>
            prev.length == correctWordLength
              ? checkGuess(prev.toLocaleLowerCase())
              : prev
          );
          setValue((prev) => (prev.length == correctWordLength ? "" : prev));
          break;
        }
        default: {
          setValue((prev) =>
            prev.length != correctWordLength ? prev + button : prev
          );
        }
      }
    },
    [setValue]
  );

  return { onPressHandler };
};
