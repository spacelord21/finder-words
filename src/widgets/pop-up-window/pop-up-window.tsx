import { ReactNode } from "react";
import { Container, Window, IconWrapper } from "./styles";
import { Close, PrimaryButton } from "@shared/ui";
import { Dimensions } from "react-native";

type TWindowProps = {
  onClosePressHandler: () => void;
  children: ReactNode;
};

const windowSize = Dimensions.get("screen").width - 32;

export const PopUpWindow = ({
  children,
  onClosePressHandler,
}: TWindowProps) => {
  return (
    <Container>
      <Window
        style={{
          width: windowSize - 8,
          height: 1.5 * windowSize,
        }}
      >
        <IconWrapper onPress={onClosePressHandler}>
          <Close />
        </IconWrapper>
        {children}
      </Window>
    </Container>
  );
};
