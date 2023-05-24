import React, { SetStateAction } from "react";
import { KeyboardButton } from "./styles";
import { ButtonContent } from "./button-content";
import { useButtonsColor, useButtonsPressHandler } from "../hooks";

export type TKeyboardButton = {
  color: string;
  backgroundColor: string;
  width: number;
  height: number;
};

type TButtonProps = {
  content: string;
  buttonSize: number;
};

export const Button = ({ content, buttonSize }: TButtonProps) => {
  const { letterBackgroundColor, letterColor, notLettersBackgroundColor } =
    useButtonsColor(content);
  const { onPressHandler } = useButtonsPressHandler();
  return (
    <KeyboardButton
      width={content === "<" ? buttonSize + 25 : buttonSize}
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
