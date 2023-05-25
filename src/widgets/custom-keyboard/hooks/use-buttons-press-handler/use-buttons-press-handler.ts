import { enterPress, setGuess } from "@entities/game";
import { useCallback } from "react";

export const useButtonsPressHandler = () => {
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
