import React from "react";
import { useTheme } from "styled-components";
import { useButtonsColor, useButtonsPressHandler } from "./hooks";
import { KeyboardButton } from "./styles";
import { ButtonContent } from "./button-content";

export type TKeyboardButton = {
  color: string;
  backgroundColor: string;
  width: number;
  height: number;
};

type TButtonProps = {
  content: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  buttonSize: number;
};

export const Button = ({ content, setValue, buttonSize }: TButtonProps) => {
  const theme = useTheme();
  const { letterBackgroundColor, notLettersBackgroundColor, letterColor } =
    useButtonsColor(content);
  const { onPressHandler } = useButtonsPressHandler(setValue);

  return (
    <KeyboardButton
      width={content === ">" || content === "<" ? buttonSize + 10 : buttonSize}
      height={buttonSize}
      backgroundColor={
        notLettersBackgroundColor
          ? notLettersBackgroundColor
          : letterBackgroundColor
      }
      onPress={() => onPressHandler(content)}
    >
      <ButtonContent content={content} letterColor={letterColor} />
    </KeyboardButton>
  );
};

const shouldComponentUpdate = (
  prevProp: TButtonProps,
  nextProp: TButtonProps
) => {
  return prevProp.content === nextProp.content;
};

export const MemoButton = React.memo(Button, shouldComponentUpdate);
