import { TBottomTabsParamList } from "@app/navigation/types";
import { Header, Separator, Typography, styled } from "@shared/ui";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
} from "./texts";
import { Dimensions } from "react-native";
import { RowCells } from "@screens/game/ui";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.blue};
  line-height: 27px;
  width: 90%;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

type Navigation = MaterialBottomTabNavigationProp<
  TBottomTabsParamList,
  "rules"
>;

export const Rules = () => {
  const navigation = useNavigation<Navigation>();
  const cellSize = Dimensions.get("screen").width / 5 - 16;
  const isFocused = useIsFocused();

  return isFocused ? (
    <Container>
      <Header title="Правила" onPressLeft={() => navigation.navigate("main")} />
      <Scroll
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Text variant="body20">{text1}</Text>
        <Text variant="body20">{text2}</Text>
        <Text variant="body20">{text3}</Text>
        <RowCells
          rightWord="дефис"
          cellHeight={cellSize + 10}
          cellWidth={cellSize}
          isCurrent={false}
          word="наряд"
          wordLength={5}
        />
        <Text variant="body20">{text4}</Text>
        <Separator />
        <Text variant="body20">{text5}</Text>
        <RowCells
          rightWord="дефис"
          cellHeight={cellSize + 10}
          cellWidth={cellSize}
          isCurrent={false}
          word="дерби"
          wordLength={5}
        />
        <Text variant="body20">{text6}</Text>
        <Separator />
        <RowCells
          rightWord="дефис"
          cellHeight={cellSize + 10}
          cellWidth={cellSize}
          isCurrent={false}
          word="дефис"
          wordLength={5}
        />
        <Text variant="body20">{text7}</Text>
        <Separator />
        <Text variant="body20">{text8}</Text>
      </Scroll>
    </Container>
  ) : null;
};
