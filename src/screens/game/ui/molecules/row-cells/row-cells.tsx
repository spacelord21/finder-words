import { styled } from "@shared/ui";
import { FlatList, ListRenderItem } from "react-native";
import { MemoCell } from "../../atoms/cell";
import React from "react";

const Container = styled.Pressable`
  flex-direction: row;
`;

type TRowCellsProps = {
  wordLength: number;
  word: string;
  cellHeight: number;
  cellWidth: number;
  isCurrent: boolean;
  rightWord: string;
};
export const RowCells = ({
  wordLength,
  word,
  cellHeight,
  cellWidth,
  isCurrent,
  rightWord,
}: TRowCellsProps) => {
  const mockArray = new Array(wordLength).fill(0);

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <MemoCell
        key={index}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        value={word[index]}
        index={index}
        isCurrent={isCurrent}
        isCurrentCell={word.length == index && isCurrent}
        guess={word}
        rightWord={rightWord}
      />
    );
  };

  return (
    <Container>
      <FlatList
        data={mockArray}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{ width: "100%" }}
        horizontal
      />
    </Container>
  );
};

export const MemoRowCells = React.memo(RowCells);
