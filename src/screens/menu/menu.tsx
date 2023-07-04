import { Typography, styled } from "@shared/ui";
import { Categories, Title } from "./ui";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const Menu = () => {
  // const isLoading = useStore()

  const pressHandler = async () => {
    await AsyncStorage.clear();
  };

  return (
    <Container>
      <Title />
      <CategoryItem activeOpacity={0.7} onPress={pressHandler}>
        <Text variant="title">Сбросить стор</Text>
      </CategoryItem>
      <Categories />
    </Container>
  );
};
