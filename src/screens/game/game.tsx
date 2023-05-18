import { Back, Typography, styled } from "@shared/ui";
import { GameBoard, GameResults } from "./ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "effector-react";
import { $gameResultsShown } from "@entities/game";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

const IconBackWrapper = styled.TouchableOpacity`
  position: absolute;
  left: ${({ theme }) => theme.spacing(3)}px;
  top: ${({ theme }) => theme.spacing(4)}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  flex-direction: row;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "game">;

export const Game = () => {
  const navigation = useNavigation<Navigation>();
  const isResultsShown = useStore($gameResultsShown);

  return (
    <Container>
      <IconBackWrapper
        onPress={() => {
          navigation.navigate("main");
        }}
        activeOpacity={0.7}
      >
        <Back />
        <Text variant="subtitle">Выбрать режим</Text>
      </IconBackWrapper>
      {isResultsShown ? <GameResults /> : null}
      <GameBoard />
    </Container>
  );
};
