import { Typography } from "../typography";
import { styled } from "../../../theme";
import { ReactNode } from "react";

const Wrapper = styled.TouchableOpacity`
  border-radius: 26px;
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(4)}px;
  background-color: ${({ theme }) => theme.palette.button.primary};
  margin: ${({ theme }) => theme.spacing(2)}px;
`;
const ButtonText = styled(Typography)<{ textColor?: string }>`
  text-align: center;
  color: ${({ textColor, theme }) =>
    theme.name === "light"
      ? theme.palette.background.primary
      : textColor ?? theme.palette.text.primary};
`;

type Props = {
  children: ReactNode | string;
  textColor?: string;
  onPress: () => void;
};

export const PrimaryButton = ({ children, onPress, textColor }: Props) => {
  return (
    <Wrapper activeOpacity={0.7} onPress={onPress}>
      {typeof children === "string" ? (
        <ButtonText textColor={textColor} variant="body16">
          {children}
        </ButtonText>
      ) : (
        children
      )}
    </Wrapper>
  );
};
