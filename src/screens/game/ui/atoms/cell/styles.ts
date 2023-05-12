import { Typography, styled } from "@shared/ui";
import { TCellProps } from "./cell";

export const Container = styled.View<
  Omit<TCellProps, "index"> & { color: string }
>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 5px;
  border-color: ${({ theme, isCurrentCell, value }) =>
    isCurrentCell
      ? theme.palette.text.secondary
      : value
      ? "transparent"
      : theme.palette.text.primary};
  border-style: ${({ isCurrentCell }) => (isCurrentCell ? "solid" : "dotted")};
  border-width: ${({ isCurrentCell }) => (isCurrentCell ? 3 : 1.5)}px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(0.5)}px;
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  backface-visibility: hidden;
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: uppercase;
`;

export const Stick = styled.View<Omit<TCellProps, "index" | "value">>`
  height: ${({ size }) => size - 10}px;
  width: 2px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.keyboard.white};
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;
