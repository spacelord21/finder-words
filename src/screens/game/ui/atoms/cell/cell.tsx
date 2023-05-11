import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import React from "react";
import { useTheme } from "styled-components";
import { Container, Value } from "./styles";

export type TCellProps = {
  size: number;
  value?: string;
  index: number;
  isCurrent: boolean;
};

export const Cell = ({ size, value, index, isCurrent }: TCellProps) => {
  const { word } = useStore($gameState);
  const theme = useTheme();
  const wordArray = word.split("");
  const color =
    wordArray.includes(value!) && !isCurrent
      ? wordArray[index] === value
        ? theme.palette.accent.success
        : theme.palette.accent.wrongPlace
      : theme.palette.background.tertiary;

  return (
    <Container size={size} color={color}>
      <Value variant="title">{value ?? ""}</Value>
    </Container>
  );
};

const shouldComponentUpdate = (prevProp: TCellProps, nextProp: TCellProps) => {
  return prevProp.value === undefined && prevProp.value === nextProp.value;
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
