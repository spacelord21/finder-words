import React from "react";
import { Container, Value } from "./styles";
import { Animated } from "react-native";
import { useCellColor, useLetterAppearance, useRotate } from "./hooks";
import { useTheme } from "styled-components";

export type TCellProps = {
  size: number;
  value?: string;
  index: number;
  isCurrent: boolean;
  isCurrentCell: boolean;
  guess: string;
};

export const Cell = ({
  size,
  value,
  index,
  isCurrent,
  isCurrentCell,
  guess,
}: TCellProps) => {
  const theme = useTheme();
  const defaultColor = theme.palette.background.tertiary;
  const { rotate, readyToChangeColor } = useRotate(isCurrent, value, index);
  const { opacityRef } = useLetterAppearance(value);
  const { color } = useCellColor({
    index: index,
    isCurrentCell: isCurrentCell,
    isCurrentRow: isCurrent,
    value: value,
    guess: guess,
  });

  return (
    <Animated.View
      style={{
        opacity: value === undefined ? 1 : opacityRef,
        transform: [{ rotateX: rotate }],
      }}
    >
      <Container
        size={size}
        color={readyToChangeColor ? color : defaultColor}
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
    prevProp.isCurrent === nextProp.isCurrent &&
    prevProp.isCurrentCell === nextProp.isCurrentCell
  );
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
