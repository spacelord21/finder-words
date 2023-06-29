import { Typography, styled } from "@shared/ui";
import { Animated } from "react-native";
import { useAnimation } from "./hooks";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.accent.primary};
  width: 80%;
  height: 120px;
  position: absolute;
  border-radius: 8px;
  top: ${({ theme }) => theme.spacing(4)}px;
  z-index: 5100;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

export const Alert = () => {
  const suggestionWord = "ТЬМА";
  const {} = useAnimation();
  return (
    <Container>
      <Animated.View style={{ zIndex: 500, left: 0 }}>
        <Text variant="subtitle">
          В нашем словаре нет данного слова! Попробуйте другое, например,{" "}
          {suggestionWord}.
        </Text>
      </Animated.View>
    </Container>
  );
};
