import { Back, styled } from "@shared/ui";
import { GameBoard } from "./ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";

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
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "game">;

export const Game = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <Container>
      <IconBackWrapper
        onPress={() => {
          console.log("heres");
          navigation.navigate("main");
        }}
        activeOpacity={0.7}
      >
        <Back />
      </IconBackWrapper>
      <GameBoard />
    </Container>
  );
};
