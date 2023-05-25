import { styled } from "@shared/ui";
import { useCellColor } from "../cell/hooks";
import { useStore } from "effector-react";
import { $gameState } from "@entities/game";

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
  const { word } = useStore($gameState);
  const { color } = useCellColor({
    guess: guess,
    index: index,
    value: value,
    rightWord: word,
  });
  return <Cell color={color} />;
};
