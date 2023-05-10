import { styled } from "@shared/ui";
import { Dimensions, FlatList, ListRenderItem } from "react-native";
import { Cell } from "../../atoms";
import { useStore } from "effector-react";
import { $gameState } from "@entities/game";
import React from "react";

const Container = styled.Pressable`
  /* width: 80%; */
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
  cellSize: number;
};
export const RowCells = ({
  wordLength,
  word,
  isCurrent,
  cellSize,
}: TRowCellsProps) => {
  const mockArray = new Array(wordLength).fill(0);

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <Cell
        key={index}
        size={cellSize}
        value={word[index]}
        index={index}
        isCurrent={isCurrent}
      />
    );
  };

  return (
    <Container>
      <FlatList
        data={mockArray}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        horizontal
      />
    </Container>
  );
};

const propsAreEqual = (prevProp: TRowCellsProps, nextProp: TRowCellsProps) => {
  return prevProp.word === nextProp.word;
};

export const CellsMemo = React.memo(RowCells, propsAreEqual);
