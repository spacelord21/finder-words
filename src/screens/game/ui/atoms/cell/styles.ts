import { Typography, styled } from "@shared/ui";
import { Dimensions } from "react-native";

type TCell = {
  cellWidth: number;
  cellHeight: number;
  isCurrentCell: boolean;
  color: string;
  value?: string;
};

export const Container = styled.View<TCell>`
  width: ${({ cellWidth }) => cellWidth}px;
  height: ${({ cellHeight }) => cellHeight}px;
  border-radius: 5px;
  border-color: ${({ theme, isCurrentCell, value }) =>
    isCurrentCell
      ? theme.palette.text.blue
      : value
      ? "transparent"
      : theme.palette.text.primary};
  border-style: ${({ isCurrentCell }) => (isCurrentCell ? "solid" : "dotted")};
  border-width: ${({ isCurrentCell }) => (isCurrentCell ? 3 : 1.5)}px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(0.25)}px;
  margin-right: ${({ theme }) => theme.spacing(0.25)}px;
  margin-top: ${({ theme }) => theme.spacing(0.8)}px;
`;

export const Value = styled(Typography)<{ color: string }>`
  color: ${({ color }) => color};
  text-transform: uppercase;
`;
