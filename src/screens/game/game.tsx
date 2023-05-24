import { Back, Typography, styled } from "@shared/ui";
import { GameBoard, GameResults } from "./ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "effector-react";
import { $gameCondition, $gameResultsShown, resetState } from "@entities/game";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "styled-components";

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
  color: ${({ theme }) => theme.palette.text.blue};
`;

const Confitti = styled.View`
  /* z-index: 50; */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "game">;

export const Game = () => {
  const navigation = useNavigation<Navigation>();
  const isResultsShown = useStore($gameResultsShown);
  const condition = useStore($gameCondition);
  const theme = useTheme();

  return (
    <Container>
      <IconBackWrapper
        onPress={() => {
          resetState();
          navigation.navigate("main");
        }}
        activeOpacity={0.7}
      >
        <Back color={theme.palette.text.blue} />
        <Text variant="subtitle">Выбрать режим</Text>
      </IconBackWrapper>
      {condition == "WIN" ? (
        <Confitti>
          <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} />
        </Confitti>
      ) : null}
      {isResultsShown ? <GameResults /> : null}
      <GameBoard />
    </Container>
  );
};
