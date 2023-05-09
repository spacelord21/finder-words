import { styled } from "@shared/ui";
import { Dimensions } from "react-native";
import { Cell } from "../../atoms";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;
type TRowCells = {
  wordLength: number;
};

export const RowCells = ({ wordLength }: TRowCells) => {
  const cellSize = Dimensions.get("screen").width / wordLength - 32;
  return (
    <Container>
      {new Array(wordLength).fill(0).map((_, index) => (
        <Cell key={index} size={cellSize} />
      ))}
    </Container>
  );
};
