import { $gameMode } from "@entities/game";
import { Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { GameBoard, RowCells } from "./ui";
import { gameInfoByMode } from "@entities/types";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

export const Game = () => {
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode;
  return (
    <Container>
      {/* <Typography>Hey there! Is a {mode ?? "error"}</Typography> */}

      <GameBoard />
    </Container>
  );
};
