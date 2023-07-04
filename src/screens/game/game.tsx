import { Back, Typography, styled } from "@shared/ui";
import { GameBoard, GameResults } from "./ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "effector-react";
import { $gameCondition, $gameResultsShown, saveState } from "@entities/game";
import Confetti from "react-native-confetti";
import { useTheme } from "styled-components";
import { useConfetti } from "@features/confetti";
import { $shownAlert, Alert } from "@entities/alert";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

const IconBackWrapper = styled.TouchableOpacity`
  position: absolute;
  left: ${({ theme }) => theme.spacing(3)}px;
  top: ${({ theme }) => theme.spacing(5)}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  flex-direction: row;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.blue};
`;

const ConfettiContainer = styled.View`
  position: absolute;
  top: ${({ theme }) => theme.spacing(5)}px;
  left: 0;
  z-index: 100;
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "game">;

export const Game = () => {
  const navigation = useNavigation<Navigation>();
  const alert = useStore($shownAlert);
  const isResultsShown = useStore($gameResultsShown);
  const condition = useStore($gameCondition);
  const theme = useTheme();
  const { confetti } = useConfetti(isResultsShown, condition);

  const backPressHandler = () => {
    navigation.navigate("bottomsTabs");
    if (condition == "INPROGRESS") {
      saveState();
    }
  };

  return (
    <Container>
      {alert && <Alert />}
      <IconBackWrapper onPress={backPressHandler} activeOpacity={0.7}>
        <Back color={theme.palette.text.blue} />
        <Text variant="subtitle">Выбрать режим</Text>
      </IconBackWrapper>
      {condition == "WIN" ? (
        <ConfettiContainer>
          <Confetti
            size={2}
            ref={(node) => (confetti.current = node)}
            duration={1700}
            untilStopped={true}
          />
        </ConfettiContainer>
      ) : null}
      {isResultsShown ? <GameResults /> : null}
      <GameBoard />
    </Container>
  );
};
