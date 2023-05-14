import { styled } from "@shared/ui";
import { FlatList, ListRenderItem, VirtualizedList } from "react-native";
import { MemoCell } from "../../atoms/cell";

const Container = styled.Pressable`
  flex-direction: row;
`;

type TRowCellsProps = {
  wordLength: number;
  word: string;
  cellSize: number;
  isCurrent: boolean;
};
export const RowCells = ({
  wordLength,
  word,
  cellSize,
  isCurrent,
}: TRowCellsProps) => {
  const mockArray = new Array(wordLength).fill(0);
  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <MemoCell
        key={index}
        size={cellSize}
        value={word[index]}
        index={index}
        isCurrent={isCurrent}
        isCurrentCell={word.length == index && isCurrent}
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
