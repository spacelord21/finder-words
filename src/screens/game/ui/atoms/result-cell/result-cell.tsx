import { styled } from "@shared/ui";
import { useCellColor } from "../cell/hooks";

const Cell = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 35px;
  width: 35px;
  margin: ${({ theme }) => theme.spacing(0.5)}px;
  border: 1px solid ${({ theme }) => theme.palette.gameboard.dark};
`;

type TResultCellProps = {
  index: number;
  guess: string;
  value: string;
};

export const ResultCell = ({ guess, index, value }: TResultCellProps) => {
  const { color } = useCellColor({ guess: guess, index: index, value: value });
  return <Cell color={color} />;
};
