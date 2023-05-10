import { Backspace, Enter, Typography, styled } from "@shared/ui";
import React from "react";
import { useCallback, useEffect } from "react";
import { useTheme } from "styled-components";

type TKeyboardButton = {
  color: string;
  backgroundColor: string;
  buttonSize: number;
};

const KeyboardButton = styled.TouchableOpacity<
  Pick<TKeyboardButton, "backgroundColor" | "buttonSize">
>`
  width: ${({ buttonSize }) => buttonSize}px;
  height: ${({ buttonSize }) => buttonSize + 10}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: ${({ theme }) => theme.spacing(0.5)}px;
  border-radius: 5px;
`;

const Text = styled(Typography)<Pick<TKeyboardButton, "color">>`
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

type TButtonProps = {
  content: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  buttonSize: number;
};

export const Button = ({ content, setValue, buttonSize }: TButtonProps) => {
  const theme = useTheme();

  const onPressHandler = useCallback(
    (button: string) => {
      if (button === "<") {
        setValue((prev) => prev.slice(0, prev.length - 1));
        return;
      }
      setValue((prev) => prev + button);
    },
    [content, setValue]
  );

  return (
    <KeyboardButton
      buttonSize={buttonSize}
      backgroundColor={
        content == ">"
          ? theme.palette.accent.success
          : theme.palette.text.secondary
      }
      onPress={() => onPressHandler(content)}
    >
      {content === ">" || content === "<" ? (
        content === "<" ? (
          <IconContainer>
            <Backspace />
          </IconContainer>
        ) : (
          <IconContainer>
            <Enter size={24} />
          </IconContainer>
        )
      ) : (
        <Text color={theme.palette.text.primary}>{content}</Text>
      )}
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
