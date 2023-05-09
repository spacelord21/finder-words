import { $gameState } from "@entities/game";
import { Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { useTheme } from "styled-components";

type TCellProps = {
  size: number;
  value?: string;
  index: number;
  isCurrent: boolean;
};

const Container = styled.View<Pick<TCellProps, "size"> & { color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 5px;
  border: 1px dotted ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(0.5)}px;
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: uppercase;
`;

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
