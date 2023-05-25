import { changeCellTheme } from "@entities/theme";
import {
  Typography,
  styled,
  firstVariant,
  secondVariant,
  thirdVariant,
} from "@shared/ui";
import { useTheme } from "styled-components";
import { RowCells } from "../../molecules";

const ITEM_SIZE = 65;

const Container = styled.View`
  flex-direction: column;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.blue};
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const Item = styled.TouchableOpacity<{
  color: string;
  cellTheme: typeof firstVariant;
}>`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  border: 2px solid
    ${({ theme, cellTheme }) =>
      theme.palette.gameboard.rightPlace === cellTheme.rightPlace
        ? theme.palette.text.blue
        : theme.palette.background.tertiary};
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  margin: ${({ theme }) => theme.spacing(1.5)}px;
  justify-content: center;
  align-items: center;
`;

export const CellsTheme = () => {
  const theme = useTheme();
  const backgroundColor = theme.palette.background.primary;
  const defaultColor1 = firstVariant.default;
  const wrong1 = firstVariant.wrong;
  const wrongPlace1 = firstVariant.wrongPlace;
  const rightPlace1 = firstVariant.rightPlace;
  const defaultColor2 = secondVariant.default;
  const wrong2 = secondVariant.wrong;
  const wrongPlace2 = secondVariant.wrongPlace;
  const rightPlace2 = secondVariant.rightPlace;
  const defaultColor3 = thirdVariant.default;
  const wrong3 = thirdVariant.wrong;
  const wrongPlace3 = thirdVariant.wrongPlace;
  const rightPlace3 = thirdVariant.rightPlace;
  return (
    <Container>
      <Title variant="title">Тема ячеек</Title>
      <ItemsContainer>
        <Item
          color={backgroundColor}
          cellTheme={firstVariant}
          onPress={() => changeCellTheme(firstVariant)}
        >
          <RowCells colors={[defaultColor1, wrong1]} />
          <RowCells colors={[wrongPlace1, rightPlace1]} />
        </Item>
        <Item
          color={backgroundColor}
          cellTheme={secondVariant}
          onPress={() => changeCellTheme(secondVariant)}
        >
          <RowCells colors={[defaultColor2, wrong2]} />

          <RowCells colors={[wrongPlace2, rightPlace2]} />
        </Item>
        <Item
          color={backgroundColor}
          cellTheme={thirdVariant}
          onPress={() => changeCellTheme(thirdVariant)}
        >
          <RowCells colors={[defaultColor3, wrong3]} />
          <RowCells colors={[wrongPlace3, rightPlace3]} />
        </Item>
      </ItemsContainer>
    </Container>
  );
};
