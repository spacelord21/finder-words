import { $gameState } from "@entities/game";
import { styled } from "@shared/ui";
import { useStore } from "effector-react";
import { FlatList, ListRenderItem } from "react-native";
import { ResultCell } from "../../atoms";

const Container = styled.View<{ height: number }>`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.name == "light"
      ? theme.palette.background.secondary
      : theme.palette.background.primary};
  height: ${({ height }) => height}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

export const ResultGrid = () => {
  const { previousGuesses, attempt } = useStore($gameState);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <RowContainer>
        {item.split("").map((value, index) => (
          <ResultCell guess={item} index={index} value={value} key={index} />
        ))}
      </RowContainer>
    );
  };

  return (
    <Container height={attempt * 45}>
      <FlatList
        data={previousGuesses}
        renderItem={renderItem}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Container>
  );
};
