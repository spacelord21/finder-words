import { $gameMode, enterPress, setGuess } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { useStore } from "effector-react";
import { useCallback } from "react";

export const useButtonsPressHandler = (
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode;
  const onPressHandler = useCallback((button: string) => {
    switch (button) {
      case ">": {
        enterPress();
        break;
      }
      default: {
        setGuess(button);
      }
    }
  }, []);

  return { onPressHandler };
};
