import { Typography, styled } from "@shared/ui";
import { Animated } from "react-native";
import { useAnimation } from "./hooks";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.primary};
  width: 95%;
  height: 120px;
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)}px;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Alert = () => {
  const suggestionWord = "тьма";
  const {} = useAnimation();
  return (
    <Animated.View>
      <Container>
        <Text>
          В нашем словаре нет данного слова! Попробуйте другое, например{" "}
          {suggestionWord}.
        </Text>
      </Container>
    </Animated.View>
  );
};
