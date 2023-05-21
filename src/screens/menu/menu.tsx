import { Typography, styled } from "@shared/ui";
import { Categories, Title } from "./ui";
import { useStore } from "effector-react";
import { $targets } from "@entities/game";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

const CategoryItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  width: 200px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "main">;

export const Menu = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <Container>
      <Title />
      <CategoryItem
        activeOpacity={0.7}
        onPress={() => navigation.navigate("settings")}
      >
        <Text variant="title">Настройки</Text>
      </CategoryItem>
      <Categories />
    </Container>
  );
};
