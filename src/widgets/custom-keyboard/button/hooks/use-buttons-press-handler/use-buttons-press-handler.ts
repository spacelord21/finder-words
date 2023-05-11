import { checkGuess } from "@entities/game";
import { useCallback } from "react";

export const useButtonsPressHandler = (
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const onPressHandler = useCallback(
    (button: string) => {
      switch (button) {
        case "<": {
          setValue((prev) => prev.slice(0, prev.length - 1));
          break;
        }
        case ">": {
          setValue((prev) => checkGuess(prev.toLocaleLowerCase()));
          setValue("");
          break;
        }
        default: {
          setValue((prev) => prev + button);
        }
      }
    },
    [setValue]
  );

  return { onPressHandler };
};
