import { useTheme } from "styled-components";
import { Back } from "../../../icons";
import { styled } from "../../../theme";
import { Typography } from "../../atoms";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: ${({ theme }) => theme.spacing(10)}px;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.blue};
`;

const IconWrapper = styled.TouchableOpacity`
  left: 20px;
  top: 30px;
  position: absolute;
`;

type THeaderProps = {
  title: string;
  onPressLeft: () => void;
};

export const Header = ({ onPressLeft, title }: THeaderProps) => {
  const theme = useTheme();
  return (
    <Container
      style={{
        borderBottomColor: theme.palette.text.blue,
        borderBottomWidth: 0.5,
      }}
    >
      <IconWrapper onPress={onPressLeft}>
        <Back color={theme.palette.text.blue} />
      </IconWrapper>
      <Title variant="title">{title}</Title>
    </Container>
  );
};
