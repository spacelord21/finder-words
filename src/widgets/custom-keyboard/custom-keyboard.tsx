import { Typography, styled } from "@shared/ui";
import { keyboard } from "./keyboard";
import { MemoButton } from "./button";
import { Dimensions, FlatList, ListRenderItem } from "react-native";
import { useButtonsColor } from "./hooks";
import { enterPress } from "@entities/game";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(1.5)}px;
  align-items: center;
`;

const EnterButton = styled.TouchableOpacity`
  width: 95%;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.name == "light" ? "#ffffff" : theme.palette.gameboard.backspace};
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  height: 45px;
`;

const EnterText = styled(Typography)`
  color: ${({ theme }) =>
    theme.name == "light" ? theme.palette.gameboard.backspace : "#FFFFFF"};
`;

export const CustomKeyboard = () => {
  const buttonSize =
    Dimensions.get("screen").width / keyboard["firstLevel"].length - 4;

  const renderButton: ListRenderItem<string> = ({ item: content }) => {
    return <MemoButton buttonSize={buttonSize} content={content} />;
  };

  const renderLevel: ListRenderItem<string[]> = ({ item: levels }) => {
    return (
      <FlatList
        data={levels}
        renderItem={renderButton}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        horizontal
      />
    );
  };

  return (
    <Container>
      <FlatList
        data={Object.values(keyboard)}
        renderItem={renderLevel}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      <EnterButton onPress={() => enterPress()} activeOpacity={0.7}>
        <EnterText variant="title">Готово</EnterText>
      </EnterButton>
    </Container>
  );
};
