import React from "react";
import { Container, Value } from "./styles";
import { Animated } from "react-native";
import { useCellColor, useLetterAppearance, useRotate } from "./hooks";

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
  const { color } = useCellColor({
    index: index,
    isCurrentCell: isCurrentCell,
    isCurrentRow: isCurrent,
    value: value,
    guess: guess,
  });
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
    prevProp.isCurrent === nextProp.isCurrent
  );
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
