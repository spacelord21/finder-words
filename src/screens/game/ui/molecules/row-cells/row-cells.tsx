import { styled } from "@shared/ui";
import { FlatList, ListRenderItem } from "react-native";
import { MemoCell } from "../../atoms/cell";

const Container = styled.Pressable`
  flex-direction: column;
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
      <MemoCell
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
