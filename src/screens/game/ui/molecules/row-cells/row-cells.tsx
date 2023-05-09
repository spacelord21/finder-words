import { styled } from "@shared/ui";
import { Dimensions } from "react-native";
import { Cell } from "../../atoms";
import { useStore } from "effector-react";
import { $gameState } from "@entities/game";

const Container = styled.Pressable`
  width: 80%;
  flex-direction: column;
`;

const CellContainer = styled.View`
  justify-content: space-evenly;
  flex-direction: row;
`;

type TRowCellsProps = {
  wordLength: number;
  word: string;
  isCurrent: boolean;
};
export const RowCells = ({ wordLength, word, isCurrent }: TRowCellsProps) => {
  const cellSize = Dimensions.get("screen").width / wordLength - 32;
  return (
    <Container>
      <CellContainer>
        {new Array(wordLength).fill(0).map((_, index) => (
          <Cell
            key={index}
            size={cellSize}
            value={word[index]}
            index={index}
            isCurrent={isCurrent}
          />
        ))}
      </CellContainer>
    </Container>
  );
};
