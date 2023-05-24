import React from "react";
import { Container, Value } from "./styles";
import { Animated } from "react-native";
import { useCellColor, useLetterAppearance, useRotate } from "./hooks";
import { useTheme } from "styled-components";

export type TCellProps = {
  cellHeight: number;
  cellWidth: number;
  value?: string;
  index: number;
  isCurrent: boolean;
  isCurrentCell: boolean;
  guess: string;
};

export const Cell = ({
  cellHeight,
  cellWidth,
  value,
  index,
  isCurrent,
  isCurrentCell,
  guess,
}: TCellProps) => {
  const theme = useTheme();
  const defaultColor = theme.palette.background.tertiary;
  const { scaleAnimation, readyToChangeColor } = useRotate(
    isCurrent,
    value,
    index
  );
  const { appearance } = useLetterAppearance(value);
  const { color, letterColor } = useCellColor({
    index: index,
    isCurrentRow: isCurrent,
    value: value,
    guess: guess,
  });

  return (
    <Animated.View
      style={{
        transform: [
          { scaleY: readyToChangeColor ? scaleAnimation : 1 },
          { scale: appearance },
        ],
      }}
    >
      <Container
        cellHeight={cellHeight}
        cellWidth={cellWidth}
        color={readyToChangeColor ? color : defaultColor}
        isCurrentCell={isCurrentCell}
        value={value}
      >
        <Value
          variant="largeTitle"
          color={
            readyToChangeColor
              ? letterColor
              : theme.name == "dark"
              ? "#FFFFFF"
              : theme.palette.text.dark
          }
        >
          {value}
        </Value>
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
