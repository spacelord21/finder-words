import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import React from "react";
import { useTheme } from "styled-components";
import { Container, Value } from "./styles";
import { Animated } from "react-native";
import { useLetterAppearance, useRotate } from "./hooks";

export type TCellProps = {
  size: number;
  value?: string;
  index: number;
  isCurrent: boolean;
  isCurrentCell: boolean;
};

export const Cell = ({
  size,
  value,
  index,
  isCurrent,
  isCurrentCell,
}: TCellProps) => {
  const { word, wrong } = useStore($gameState);
  const theme = useTheme();
  const wordArray = word.split("");
  const color =
    wordArray.includes(value!) && !isCurrent && !isCurrentCell
      ? wordArray[index] === value
        ? theme.palette.accent.success
        : theme.palette.accent.wrongPlace
      : wrong.includes(value!) && !isCurrent
      ? theme.palette.keyboard.backspace
      : theme.palette.background.tertiary;
  const { rotate } = useRotate(isCurrent, value);
  const { opacityRef } = useLetterAppearance(value);

  return (
    <Animated.View
      style={{
        opacity: value === undefined ? 1 : opacityRef,
        transform: [{ rotateX: rotate }],
      }}
    >
      <Container
        size={size}
        color={color}
        isCurrentCell={isCurrentCell}
        value={value}
      >
        <Value variant="largeTitle">{value}</Value>
      </Container>
    </Animated.View>
  );
};

const shouldComponentUpdate = (prevProp: TCellProps, nextProp: TCellProps) => {
  return (
    prevProp.value === undefined &&
    prevProp.value === nextProp.value &&
    prevProp.isCurrentCell === nextProp.isCurrentCell
    // prevProp.isCurrent === nextProp.isCurrent
  );
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
