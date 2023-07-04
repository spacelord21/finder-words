import { Typography, styled } from "@shared/ui";
import { Animated } from "react-native";
import { useAnimation } from "./hooks";
import { $gameMode } from "../../game";
import { useStore } from "effector-react";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  width: 100%;
  height: 120px;
  border-radius: 8px;
  position: absolute;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
  line-height: 28px;
`;

export const Alert = () => {
  const mode = useStore($gameMode);
  const suggestionWord = () => {
    switch (mode) {
      case "4_LETTERS":
        return "МАМА";
      case "5_LETTERS":
        return "СЕМЬЯ";
      case "6_LETTERS":
        return "РОДИНА";
    }
  };
  const { appearance } = useAnimation();
  return (
    <Animated.View
      style={{
        zIndex: 500,
        transform: [
          {
            translateY: appearance,
          },
        ],
        width: "80%",
      }}
    >
      <Container>
        <Text variant="subtitle">
          В нашем словаре нет данного слова! Попробуйте другое, например,{" "}
          {suggestionWord()}.
        </Text>
      </Container>
    </Animated.View>
  );
};
