import { TMainStackParamList } from "@app/navigation/types";
import { categories } from "@entities/categories";
import { setGameMode } from "@entities/game";
import { TGameMode, TCategory, gameInfoByMode } from "@entities/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Typography, styled } from "@shared/ui";
import { FlatList, ListRenderItem } from "react-native";

const CategoriesList = styled(FlatList<TCategory>)`
  width: 100%;
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

export const Categories = () => {
  const navigation = useNavigation<Navigation>();
  const onPressHandler = (mode: TGameMode) => {
    setGameMode(mode);
    navigation.navigate("game");
  };

  const renderItem: ListRenderItem<TCategory> = ({ item }) => {
    return (
      <CategoryItem
        activeOpacity={0.7}
        onPress={() => onPressHandler(item.mode)}
      >
        <Text variant="title">{item.title}</Text>
      </CategoryItem>
    );
  };
  return (
    <CategoriesList
      data={categories}
      renderItem={renderItem}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
