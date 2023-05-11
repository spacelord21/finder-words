import { Typography, styled } from "@shared/ui";
import { TCellProps } from "./cell";

export const Container = styled.View<
  Pick<TCellProps, "size"> & { color: string }
>`
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

export const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: uppercase;
`;
