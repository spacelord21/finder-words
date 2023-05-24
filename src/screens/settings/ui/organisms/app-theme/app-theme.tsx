import { changeTheme } from "@entities/theme";
import {
  Typography,
  styled,
  primaryDarkTheme,
  primaryLightTheme,
} from "@shared/ui";
import { Item } from "../../molecules/item";

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

export const AppTheme = () => {
  return (
    <Container>
      <Title variant="title">Тема приложения</Title>
      <ItemsContainer>
        <Item
          color={primaryLightTheme.palette.background.primary}
          onPress={() => changeTheme(primaryLightTheme)}
        />
        <Item
          color={primaryDarkTheme.palette.background.primary}
          onPress={() => changeTheme(primaryDarkTheme)}
        />
      </ItemsContainer>
    </Container>
  );
};
