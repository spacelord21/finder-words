import { $gameMode } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { styled } from "@shared/ui";
import { useStore } from "effector-react";
import { RowCells } from "../../molecules";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const KeyBoard = styled.View`
  flex: 1;
`;

const CellsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameBoard = () => {
  const gameInfo = gameInfoByMode;
  const mode = useStore($gameMode);
  return (
    <Container>
      <CellsContainer>
        {new Array(gameInfo[mode ?? "4_LETTERS"].attempts)
          .fill(0)
          .map((_, index) => (
            <RowCells wordLength={4} key={index} />
          ))}
      </CellsContainer>
      <KeyBoard />
    </Container>
  );
};
