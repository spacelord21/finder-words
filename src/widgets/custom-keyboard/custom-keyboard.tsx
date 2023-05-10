import { styled } from "@shared/ui";
import { keyboard } from "./keyboard";
import { Button, MemoButton } from "./button";
import { Dimensions, FlatList, ListRenderItem } from "react-native";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

type TCustomKeyboardProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const buttonSize =
  Dimensions.get("screen").width / keyboard["firstLevel"].length - 8;

export const CustomKeyboard = ({ setValue, value }: TCustomKeyboardProps) => {
  const renderButton: ListRenderItem<string> = ({ item: content }) => {
    return (
      <MemoButton
        buttonSize={buttonSize}
        content={content}
        setValue={setValue}
      />
    );
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
    </Container>
  );
};
