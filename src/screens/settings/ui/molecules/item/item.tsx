import { styled } from "@shared/ui";
import { useTheme } from "styled-components";
import { RowCells } from "../row-cells";

const ITEM_SIZE = 65;

const Container = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  border: 2px solid
    ${({ theme, color }) =>
      theme.palette.background.primary == color
        ? theme.palette.text.blue
        : color};
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  margin: ${({ theme }) => theme.spacing(1.5)}px;
  justify-content: center;
  align-items: center;
`;

type Props = {
  color: string;
  onPress: () => void;
};

export const Item = ({ color, onPress }: Props) => {
  const theme = useTheme();
  const defaultColor = theme.palette.gameboard.default;
  const wrong = theme.palette.gameboard.wrong;
  const wrongPlace = theme.palette.gameboard.wrongPlace;
  const rightPlace = theme.palette.gameboard.rightPlace;

  return (
    <Container color={color} onPress={onPress} activeOpacity={0.7}>
      <RowCells colors={[defaultColor, wrong]} />
      <RowCells colors={[wrongPlace, rightPlace]} />
    </Container>
  );
};
