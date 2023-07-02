import { TMainStackParamList } from "@app/navigation/types";
import { categories } from "@entities/categories";
import { checkStorageFx, setGameMode } from "@entities/game";
import { TGameMode, TCategory } from "@entities/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Typography, styled } from "@shared/ui";
import { FlatList, ListRenderItem } from "react-native";
import { useTheme } from "styled-components";

const CategoriesList = styled(FlatList<TCategory>)`
  flex: 1;
  width: 100%;
`;

const CategoryItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  padding: ${({ theme }) => theme.spacing(1)}px;
  width: 80%;
  align-self: center;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "bottomsTabs">;

export const Categories = () => {
  const navigation = useNavigation<Navigation>();
  const theme = useTheme();

  checkStorageFx.doneData.watch(() => {
    navigation.navigate("game");
  });

  const onPressHandler = (mode: TGameMode) => {
    setGameMode(mode);
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
        // alignItems: "center",
      }}
    />
  );
};
