import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import React from "react";
import { useTheme } from "styled-components";
import { Container, Stick, Value } from "./styles";
import { Animated } from "react-native";
import { useBlinking } from "./hooks";

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
  const { word } = useStore($gameState);
  const theme = useTheme();
  const wordArray = word.split("");
  const color =
    wordArray.includes(value!) && !isCurrent
      ? wordArray[index] === value
        ? theme.palette.accent.success
        : theme.palette.accent.wrongPlace
      : theme.palette.background.tertiary;
  const { blinking } = useBlinking();

  return (
    <Container
      size={size}
      color={color}
      isCurrent={isCurrent}
      isCurrentCell={isCurrentCell}
    >
      {value ? (
        <Value variant="largeTitle">{value}</Value>
      ) : (
        <Animated.View style={{ opacity: blinking }}>
          <Stick
            isCurrent={isCurrent}
            isCurrentCell={isCurrentCell}
            size={size}
          />
        </Animated.View>
      )}
    </Container>
  );
};

const shouldComponentUpdate = (prevProp: TCellProps, nextProp: TCellProps) => {
  return (
    prevProp.value === undefined &&
    prevProp.value === nextProp.value &&
    prevProp.isCurrentCell === nextProp.isCurrentCell
  );
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
